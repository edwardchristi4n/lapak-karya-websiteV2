import { useEffect, useMemo, useState } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { BOX, MATERIALS } from "./unboxingConfig";
import {
  loadBrandLogoTexture,
  plainLogoTexture,
} from "./logoTexture";

/**
 * Lid rigid box — mesh terpisah, berputar pada engsel di tepi BELAKANG
 * box (bukan tengah lid): group diposisikan di engsel, mesh lid
 * digeser ke depan di dalam group sehingga rotasi X group = engsel.
 */
export function BoxLid({
  lidRef,
}: {
  /** ref group engsel — target rotasi timeline GSAP */
  lidRef: React.RefObject<THREE.Group | null>;
}) {
  const [logo, setLogo] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    let texture: THREE.CanvasTexture | null = null;
    loadBrandLogoTexture()
      .then((t) => {
        if (cancelled) {
          t.dispose();
          return;
        }
        texture = t;
        setLogo(t);
      })
      .catch(() => {
        if (!cancelled) {
          texture = plainLogoTexture();
          setLogo(texture);
        }
      });
    return () => {
      cancelled = true;
      texture?.dispose();
    };
  }, []);

  /** basic + toneMapped false → warna asli logo tampil akurat di lid putih */
  const logoMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: logo,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    [logo],
  );

  useEffect(() => {
    return () => {
      logoMaterial.dispose();
    };
  }, [logoMaterial]);

  const lidW = BOX.w + BOX.overlap * 2;
  const lidD = BOX.d + BOX.overlap * 2;

  return (
    <group ref={lidRef} position={[0, BOX.h, -BOX.d / 2]}>
      <RoundedBox
        args={[lidW, BOX.lidH, lidD]}
        radius={0.03}
        smoothness={3}
        position={[0, BOX.lidH / 2, lidD / 2 - BOX.overlap]}
      >
        <meshStandardMaterial
          color={MATERIALS.exterior.color}
          roughness={MATERIALS.exterior.roughness}
          metalness={MATERIALS.exterior.metalness}
          transparent
        />
      </RoundedBox>
      {logo && (
        <mesh
          position={[0, BOX.lidH + 0.004, lidD / 2 - BOX.overlap]}
          rotation={[-Math.PI / 2, 0, 0]}
          renderOrder={1}
        >
          <planeGeometry args={[BOX.w * 0.52, BOX.w * 0.52]} />
          <primitive object={logoMaterial} attach="material" />
        </mesh>
      )}
    </group>
  );
}
