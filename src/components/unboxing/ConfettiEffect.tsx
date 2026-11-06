import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CONFETTI_COLORS } from "./unboxingConfig";

const GRAVITY = 5.4;
const MAX_LIFE = 2.4;
const MAX_DELAY = 0.12;
const END_TIME = MAX_DELAY + MAX_LIFE + 0.2;

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

interface Particle {
  delay: number;
  life: number;
  vx: number;
  vy: number;
  vz: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  flutterFreq: number;
  flutterPhase: number;
  /** variasi bentuk kertas: lebar & panjang persegi panjang */
  scaleX: number;
  scaleY: number;
  colorIndex: number;
}

function makeParticles(count: number): Particle[] {
  const rnd = mulberry32(20261105);
  return Array.from({ length: count }, () => {
    const azimuth = rnd() * Math.PI * 2;
    const elevation = (52 + rnd() * 33) * (Math.PI / 180);
    const speed = 1.7 + rnd() * 1.0;
    const cosEl = Math.cos(elevation);
    return {
      delay: rnd() * MAX_DELAY,
      life: 1.6 + rnd() * (MAX_LIFE - 1.6),
      vx: speed * cosEl * Math.cos(azimuth),
      vy: speed * Math.sin(elevation),
      vz: speed * cosEl * Math.sin(azimuth),
      spinX: 4 + rnd() * 8,
      spinY: 4 + rnd() * 8,
      spinZ: 4 + rnd() * 8,
      flutterFreq: 5 + rnd() * 4,
      flutterPhase: rnd() * Math.PI * 2,
      scaleX: 0.55 + rnd() * 0.75,
      scaleY: 0.7 + rnd() * 0.9,
      colorIndex: Math.floor(rnd() * CONFETTI_COLORS.length),
    };
  });
}

const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();

/**
 * Confetti dari dalam box: satu InstancedMesh (bukan ratusan komponen),
 * gerak ballistic + gravitasi + flutter, update berhenti otomatis setelah
 * seluruh partikel selesai (flag finished). Trigger: prop `burst` bertambah.
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
        elapsedRef.current = 0;
        finished.current = false;
      }
    }
    if (finished.current) return;

    elapsedRef.current += Math.min(rawDt, 0.05);
    const t = elapsedRef.current;
    if (t > END_TIME) {
      finished.current = true;
      return;
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const ti = t - p.delay;
      if (ti <= 0) {
        dummy.position.set(origin[0], origin[1], origin[2]);
        dummy.scale.setScalar(0);
      } else {
        const fall = 0.5 * GRAVITY * ti * ti;
        const flutter = Math.min(1, ti * 3) * 0.09;
        dummy.position.set(
          origin[0] + p.vx * ti + Math.sin(ti * p.flutterFreq + p.flutterPhase) * flutter,
          origin[1] + p.vy * ti - fall,
          origin[2] + p.vz * ti + Math.cos(ti * p.flutterFreq * 0.9 + p.flutterPhase) * flutter,
        );
        dummy.rotation.set(p.spinX * ti, p.spinY * ti, p.spinZ * ti);
        const popIn = Math.min(1, ti * 12);
        const fadeOut = Math.min(1, Math.max(0, (p.life - ti) / (p.life * 0.3)));
        const s = popIn * fadeOut;
        dummy.scale.set(p.scaleX * s, p.scaleY * s, 1);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
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
