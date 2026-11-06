import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { BOX, MATERIALS } from "./unboxingConfig";

/**
 * Kompartemen dalam: lapisan cream (liners) sedikit lebih kecil dari
 * cangkang navy, plus alas padding — terlihat saat lid terbuka.
 */
export function BoxInterior() {
  const t = BOX.wall;
  const inset = t * 1.15;
  const innerW = BOX.w - inset * 2;
  const innerD = BOX.d - inset * 2;
  const floorY = BOX.baseT + 0.02;

  // geometri dinding dibuat sekali lalu dipakai ulang (4 sisi)
  const sideGeo = useMemo(
    () =>
      new THREE.BoxGeometry(innerW + t, BOX.h - BOX.baseT, t),
    [innerW, t],
  );
  const frontGeo = useMemo(
    () =>
      new THREE.BoxGeometry(t, BOX.h - BOX.baseT, innerD),
    [innerD, t],
  );

  useEffect(() => {
    return () => {
      sideGeo.dispose();
      frontGeo.dispose();
    };
  }, [sideGeo, frontGeo]);

  return (
    <group>
      {/* lantai dalam */}
      <mesh position={[0, floorY, 0]}>
        <boxGeometry args={[innerW, 0.03, innerD]} />
        <meshStandardMaterial
          color={MATERIALS.interior.color}
          roughness={MATERIALS.interior.roughness}
          transparent
        />
      </mesh>
      {/* padding alas — sedikit lebih rendah dari bibir box */}
      <mesh position={[0, floorY + 0.06, 0]}>
        <boxGeometry args={[innerW - 0.08, 0.12, innerD - 0.08]} />
        <meshStandardMaterial
          color="#efe6d6"
          roughness={0.95}
          metalness={0}
          transparent
        />
      </mesh>
      {/* liner cream dinding dalam */}
      <mesh
        position={[0, BOX.baseT + (BOX.h - BOX.baseT) / 2, innerD / 2]}
        geometry={sideGeo}
      >
        <meshStandardMaterial
          color={MATERIALS.interior.color}
          roughness={MATERIALS.interior.roughness}
          transparent
        />
      </mesh>
      <mesh
        position={[0, BOX.baseT + (BOX.h - BOX.baseT) / 2, -innerD / 2]}
        geometry={sideGeo}
      >
        <meshStandardMaterial
          color={MATERIALS.interior.color}
          roughness={MATERIALS.interior.roughness}
          transparent
        />
      </mesh>
      <mesh
        position={[innerW / 2, BOX.baseT + (BOX.h - BOX.baseT) / 2, 0]}
        geometry={frontGeo}
      >
        <meshStandardMaterial
          color={MATERIALS.interior.color}
          roughness={MATERIALS.interior.roughness}
          transparent
        />
      </mesh>
      <mesh
        position={[-innerW / 2, BOX.baseT + (BOX.h - BOX.baseT) / 2, 0]}
        geometry={frontGeo}
      >
        <meshStandardMaterial
          color={MATERIALS.interior.color}
          roughness={MATERIALS.interior.roughness}
          transparent
        />
      </mesh>
    </group>
  );
}
