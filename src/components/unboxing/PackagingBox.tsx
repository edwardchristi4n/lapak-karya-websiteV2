import { useEffect, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { BoxInterior } from "./BoxInterior";
import { BoxLid } from "./BoxLid";
import { BOX, MATERIALS } from "./unboxingConfig";

/**
 * Rigid box prosedural (tanpa aset): alas + 4 dinding eksterior navy
 * sebagai mesh terpisah, kompartemen interior cream, dan lid dengan
 * engsel di tepi belakang. Semua bagian berada dalam satu group agar
 * timeline GSAP bisa mengangkat/memudarkan box secara utuh.
 */
export function PackagingBox({
  boxRef,
  lidRef,
  onPointerOver,
  onPointerOut,
}: {
  /** ref group utama — target float/lift/fade timeline */
  boxRef: React.RefObject<THREE.Group | null>;
  /** diteruskan ke BoxLid (rotasi engsel) */
  lidRef: React.RefObject<THREE.Group | null>;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}) {
  const hovered = useRef(false);

  // geometri dinding eksterior — dibuat sekali, dipakai ulang 4 sisi
  const walls = useMemo(() => {
    const t = BOX.wall;
    const wallH = BOX.h - BOX.baseT;
    const y = BOX.baseT + wallH / 2;
    return [
      {
        g: new THREE.BoxGeometry(BOX.w, wallH, t),
        p: [0, y, BOX.d / 2 - t / 2] as [number, number, number],
      },
      {
        g: new THREE.BoxGeometry(BOX.w, wallH, t),
        p: [0, y, -BOX.d / 2 + t / 2] as [number, number, number],
      },
      {
        g: new THREE.BoxGeometry(t, wallH, BOX.d),
        p: [BOX.w / 2 - t / 2, y, 0] as [number, number, number],
      },
      {
        g: new THREE.BoxGeometry(t, wallH, BOX.d),
        p: [-BOX.w / 2 + t / 2, y, 0] as [number, number, number],
      },
    ];
  }, []);

  useEffect(() => {
    return () => {
      for (const w of walls) w.g.dispose();
    };
  }, [walls]);

  const handlers = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!hovered.current) {
        hovered.current = true;
        onPointerOver?.();
      }
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (hovered.current) {
        hovered.current = false;
        onPointerOut?.();
      }
    },
  };

  const exterior = (
    <meshStandardMaterial
      color={MATERIALS.exterior.color}
      roughness={MATERIALS.exterior.roughness}
      metalness={MATERIALS.exterior.metalness}
      transparent
    />
  );

  return (
    <group ref={boxRef}>
      {/* alas box */}
      <RoundedBox
        args={[BOX.w, BOX.baseT, BOX.d]}
        radius={0.025}
        smoothness={3}
        position={[0, BOX.baseT / 2, 0]}
        {...handlers}
      >
        {exterior}
      </RoundedBox>
      {/* 4 dinding eksterior */}
      {walls.map((wall, i) => (
        <mesh key={i} geometry={wall.g} position={wall.p} {...handlers}>
          {exterior}
        </mesh>
      ))}
      <BoxInterior />
      <BoxLid lidRef={lidRef} />
    </group>
  );
}
