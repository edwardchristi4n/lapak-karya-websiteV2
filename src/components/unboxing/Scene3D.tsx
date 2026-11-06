import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ConfettiEffect } from "./ConfettiEffect";
import { PackagingBox } from "./PackagingBox";
import { BOX } from "./unboxingConfig";

const damp = THREE.MathUtils.damp;

/** Laporkan camera ke induk begitu Canvas siap (target timeline GSAP). */
function CameraBridge({
  onReady,
}: {
  onReady: (camera: THREE.PerspectiveCamera) => void;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useEffect(() => {
    onReady(camera);
  }, [camera, onReady]);
  return null;
}

/**
 * Parallax mouse halus (desktop saja): rotasi group mengikuti pointer,
 * diredam per frame — tanpa setState per frame (semua di ref). Kamera
 * selalu menghadap lookAtRef (vektor yang dianimasikan timeline saat
 * box terbuka, agar framing tetap proporsional).
 */
function MouseParallax({
  groupRef,
  lookAtRef,
  enabled,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  lookAtRef: React.RefObject<THREE.Vector3>;
  enabled: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    if (!enabled) return;
    const el = gl.domElement.parentElement ?? gl.domElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [enabled, gl]);

  useFrame((_, rawDt) => {
    const g = groupRef.current;
    if (!g) return;
    const dt = Math.min(rawDt, 0.05);
    // saat nonaktif, redam kembali ke pose netral (bukan rotasi basi)
    const tx = enabled ? pointer.current.x * 0.28 : 0;
    const ty = enabled ? pointer.current.y * 0.1 : 0;
    g.rotation.y = damp(g.rotation.y, tx, 3, dt);
    g.rotation.x = damp(g.rotation.x, ty, 3, dt);
    camera.lookAt(lookAtRef.current);
  });
  return null;
}

export interface SceneTier {
  mobile: boolean;
  dprMax: number;
  antialias: boolean;
  shadowRes: number;
  confettiCount: number;
}

export default function Scene3D({
  phase,
  burst,
  boxRef,
  lidRef,
  floatRef,
  hoverRef,
  lookAtRef,
  cameraBase,
  cameraFov,
  tier,
  onCameraReady,
  onBoxHover,
  inView,
}: {
  phase: string;
  burst: number;
  boxRef: React.RefObject<THREE.Group | null>;
  lidRef: React.RefObject<THREE.Group | null>;
  floatRef: React.RefObject<THREE.Group | null>;
  hoverRef: React.RefObject<THREE.Group | null>;
  /** vektor titik pandang kamera — dianimasikan timeline saat opening */
  lookAtRef: React.RefObject<THREE.Vector3>;
  cameraBase: [number, number, number];
  cameraFov: number;
  tier: SceneTier;
  onCameraReady: (camera: THREE.PerspectiveCamera) => void;
  onBoxHover: (on: boolean) => void;
  inView: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const dpr = Math.max(1, Math.min(tier.dprMax, window.devicePixelRatio || 1));

  // berhenti render saat pengalaman selesai / keluar viewport
  const active = inView && phase !== "completed";
  const frameloop = active ? "always" : "never";

  // titik asal confetti: di dalam box, sedikit di bawah bibir
  const burstOrigin: [number, number, number] = [0, BOX.h * 0.8, 0];

  return (
    <Canvas
      frameloop={frameloop}
      dpr={dpr}
      camera={{ position: cameraBase, fov: cameraFov }}
      gl={{ antialias: tier.antialias, alpha: true }}
    >
      {/* pencahayaan studio lembut */}
      <ambientLight intensity={0.92} />
      <directionalLight position={[4, 7, 4]} intensity={1.35} />
      <directionalLight position={[-5, 3, -4]} intensity={0.45} />
      <directionalLight position={[0, 4, -7]} intensity={0.35} />
      <CameraBridge onReady={onCameraReady} />
      <group ref={floatRef}>
        <group ref={hoverRef}>
          <PackagingBox
            boxRef={boxRef}
            lidRef={lidRef}
            onPointerOver={() => onBoxHover(true)}
            onPointerOut={() => onBoxHover(false)}
          />
        </group>
      </group>
      <ConfettiEffect burst={burst} origin={burstOrigin} count={tier.confettiCount} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.32}
        scale={10}
        blur={2.6}
        far={6}
        resolution={tier.shadowRes}
        color="#1b1d3a"
      />
      <MouseParallax
        groupRef={floatRef}
        lookAtRef={lookAtRef}
        enabled={active && !reduced && !tier.mobile && phase === "idle"}
      />
    </Canvas>
  );
}
