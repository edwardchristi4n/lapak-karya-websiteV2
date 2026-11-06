import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BOX, CONFETTI_COLORS } from "./unboxingConfig";

/* ── parameter fisika ──────────────────────────────────────────────
 * Dibuat curam (66–84°) & cepat (3.5–5.2) dari versi lama (52–85°,
 * 1.7–2.7): seluruh partikel melampaui bibir box (y=1.4) sebelum
 * melengkung, jadi tidak menabrak dinding/lid. Drag udara menghasilkan
 * jatuh melayang pelan (terminal ≈ GRAVITY/DRAG) khas kertas. */
const GRAVITY = 5.0;
const DRAG = 2.1;
const SPEED_MIN = 3.5;
const SPEED_RANGE = 1.7;
const ELEV_MIN_DEG = 66;
const ELEV_RANGE_DEG = 18;
const MAX_DELAY = 0.12;
const FLUTTER_SPEED = 0.35;
/** pantulan dinding dalam — sebagian besar energi diserap kertas */
const BOUNCE = 0.25;
const POP_IN_S = 0.08;
const SETTLE_S = 0.55;
const HARD_END_S = 3.6;

/* batas tabrakan box — muka DALAM liner interior (tebal wall/2 lagi) */
const INNER_X = (BOX.w - BOX.wall * 2.3) / 2 - BOX.wall / 2;
const INNER_Z = (BOX.d - BOX.wall * 2.3) / 2 - BOX.wall / 2;
const RIM_Y = BOX.h;
/** puncak padding interior — tempat mendarat bagi confetti di dalam box */
const PAD_X = (BOX.w - BOX.wall * 2.3 - 0.08) / 2;
const PAD_Z = (BOX.d - BOX.wall * 2.3 - 0.08) / 2;
const PAD_TOP = BOX.baseT + 0.02 + 0.06 + 0.06;
/** lantai cream interior (di luar padding, di dalam liner) */
const INTERIOR_FLOOR = BOX.baseT + 0.02 + 0.015;
const FLOOR_Y = 0.03;

/** PRNG deterministik — setiap ledakan identik, bebas state tambahan */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep01(x: number): number {
  const c = x < 0 ? 0 : x > 1 ? 1 : x;
  return c * c * (3 - 2 * c);
}

interface Particle {
  // konfigurasi awal (deterministik, tidak berubah)
  delay: number;
  v0x: number;
  v0y: number;
  v0z: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  flutterFreq: number;
  flutterPhase: number;
  /** variasi bentuk kertas: lebar & panjang persegi panjang */
  scaleX: number;
  scaleY: number;
  colorIndex: number;
  // state runtime (di-reset tiap burst)
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  age: number;
  landAge: number;
  landed: boolean;
  done: boolean;
}

function makeParticles(count: number): Particle[] {
  const rnd = mulberry32(20261105);
  return Array.from({ length: count }, () => {
    const azimuth = rnd() * Math.PI * 2;
    const elevation = (ELEV_MIN_DEG + rnd() * ELEV_RANGE_DEG) * (Math.PI / 180);
    const speed = SPEED_MIN + rnd() * SPEED_RANGE;
    const cosEl = Math.cos(elevation);
    return {
      delay: rnd() * MAX_DELAY,
      v0x: speed * cosEl * Math.cos(azimuth),
      v0y: speed * Math.sin(elevation),
      v0z: speed * cosEl * Math.sin(azimuth),
      spinX: 4 + rnd() * 8,
      spinY: 4 + rnd() * 8,
      spinZ: 4 + rnd() * 8,
      flutterFreq: 5 + rnd() * 4,
      flutterPhase: rnd() * Math.PI * 2,
      scaleX: 0.55 + rnd() * 0.75,
      scaleY: 0.7 + rnd() * 0.9,
      colorIndex: Math.floor(rnd() * CONFETTI_COLORS.length),
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
      age: 0,
      landAge: 0,
      landed: false,
      done: false,
    };
  });
}

function resetParticle(p: Particle, origin: [number, number, number]) {
  p.x = origin[0];
  p.y = origin[1];
  p.z = origin[2];
  p.vx = p.v0x;
  p.vy = p.v0y;
  p.vz = p.v0z;
  p.rx = p.ry = p.rz = 0;
  p.age = 0;
  p.landAge = 0;
  p.landed = false;
  p.done = false;
}

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/**
 * Confetti dari dalam box: satu InstancedMesh (bukan ratusan komponen).
 * Integrasi per-frame: gravitasi + drag udara + flutter, tabrakan dinding
 * dalam box (di bawah bibir) dan lantai — partikel mendarat lalu larut
 * halus (smoothstep), bukan menghilang mendadak di udara. Update berhenti
 * otomatis setelah seluruh partikel selesai. Trigger: prop `burst` bertambah.
 */
export function ConfettiEffect({
  burst,
  origin,
  count = 140,
}: {
  burst: number;
  origin: [number, number, number];
  count?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => makeParticles(count), [count]);
  const burstSeen = useRef(0);
  /** akumulasi waktu manual — tahan terhadap pergantian mode frameloop */
  const elapsedRef = useRef(0);
  const finished = useRef(true);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < particles.length; i++) {
      tmpColor.set(CONFETTI_COLORS[particles[i].colorIndex]);
      mesh.setColorAt(i, tmpColor);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    dummy.position.set(0, -100, 0);
    dummy.scale.setScalar(0);
    dummy.updateMatrix();
    for (let i = 0; i < particles.length; i++) mesh.setMatrixAt(i, dummy.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  }, [particles]);

  useFrame((_, rawDt) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (burst !== burstSeen.current) {
      burstSeen.current = burst;
      if (burst > 0) {
        for (const p of particles) resetParticle(p, origin);
        elapsedRef.current = 0;
        finished.current = false;
      }
    }
    if (finished.current) return;

    const dt = Math.min(rawDt, 0.05);
    elapsedRef.current += dt;
    const t = elapsedRef.current;
    if (t > HARD_END_S) {
      dummy.position.set(0, -100, 0);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      for (let i = 0; i < particles.length; i++) mesh.setMatrixAt(i, dummy.matrix);
      mesh.instanceMatrix.needsUpdate = true;
      finished.current = true;
      return;
    }

    const dragF = Math.exp(-DRAG * dt);
    let allDone = true;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.done) {
        dummy.position.set(0, -100, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        continue;
      }
      allDone = false;
      if (t <= p.delay) {
        dummy.position.set(0, -100, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        continue;
      }

      p.age = t - p.delay;
      let fade = smoothstep01(p.age / POP_IN_S);

      if (p.landed) {
        p.landAge += dt;
        fade *= 1 - smoothstep01(p.landAge / SETTLE_S);
        if (fade <= 0.001) p.done = true;
      } else {
        // integrasi: gravitasi → drag → flutter lateral
        p.vy -= GRAVITY * dt;
        p.vx *= dragF;
        p.vy *= dragF;
        p.vz *= dragF;
        p.x += p.vx * dt + Math.sin(p.age * p.flutterFreq + p.flutterPhase) * FLUTTER_SPEED * dt;
        p.z += p.vz * dt + Math.cos(p.age * p.flutterFreq * 0.9 + p.flutterPhase) * FLUTTER_SPEED * dt;
        p.y += p.vy * dt;
        p.rx += p.spinX * dt;
        p.ry += p.spinY * dt;
        p.rz += p.spinZ * dt;

        // di bawah bibir & masih di jejak box → pantul dinding dalam
        if (p.y < RIM_Y && Math.abs(p.x) < BOX.w / 2 && Math.abs(p.z) < BOX.d / 2) {
          if (Math.abs(p.x) > INNER_X) {
            p.x = Math.sign(p.x) * INNER_X;
            p.vx = -Math.abs(p.vx) * Math.sign(p.x) * BOUNCE;
          }
          if (Math.abs(p.z) > INNER_Z) {
            p.z = Math.sign(p.z) * INNER_Z;
            p.vz = -Math.abs(p.vz) * Math.sign(p.z) * BOUNCE;
          }
        }

        // mendarat: pada padding → di dalam box tapi di luar padding → lantai luar
        let rest: number;
        if (Math.abs(p.x) < BOX.w / 2 && Math.abs(p.z) < BOX.d / 2) {
          rest = Math.abs(p.x) < PAD_X && Math.abs(p.z) < PAD_Z ? PAD_TOP : INTERIOR_FLOOR;
        } else {
          rest = FLOOR_Y;
        }
        if (p.y <= rest) {
          p.y = rest;
          p.vx = p.vy = p.vz = 0;
          p.landed = true;
          p.landAge = 0;
        }
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.set(p.scaleX * fade, p.scaleY * fade, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    if (allDone) finished.current = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[0.09, 0.16]} />
      <meshBasicMaterial side={THREE.DoubleSide} toneMapped={false} />
    </instancedMesh>
  );
}
