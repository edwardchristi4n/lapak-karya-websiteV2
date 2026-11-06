import { useCallback, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import type * as THREE from "three";
import {
  BOX,
  TIMING,
  type UnboxingPhase,
} from "../components/unboxing/unboxingConfig";

export interface UnboxingTargets {
  boxGroup: THREE.Group | null;
  /** group luar — float idle */
  floatGroup: THREE.Group | null;
  /** group tengah — hover lift (terpisah dari float agar tween tak bentrok) */
  hoverGroup: THREE.Group | null;
  lidGroup: THREE.Group | null;
  camera: THREE.PerspectiveCamera | null;
  /** vektor titik pandang kamera — diangkat saat opening agar lid muat */
  lookAt: THREE.Vector3 | null;
  /** pose kamera saat box terbuka (framing proporsional) */
  cameraOpen: [number, number, number];
  lookYOpen: number;
  /** elemen HTML overlay showcase */
  showcase: HTMLElement | null;
  /** pembungkus canvas — memudar saat revealing */
  canvasWrap: HTMLElement | null;
}

/**
 * Satu timeline GSAP terkoordinasi untuk seluruh pengalaman unboxing
 * (objek three.js + DOM HTML sekaligus), dengan label fase:
 * opening → celebrating → revealing → completed. Dibangun sekali setelah
 * scene siap; dijalankan dengan start() dan tidak bisa di-restart.
 */
export function useUnboxingAnimation(
  onPhase: (p: UnboxingPhase) => void,
  onBurst: () => void,
) {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);
  const started = useRef(false);
  const targets = useRef<UnboxingTargets | null>(null);

  const collectMaterials = (group: THREE.Group): THREE.Material[] => {
    const mats: THREE.Material[] = [];
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && Array.isArray(mesh.material)) {
        mats.push(...(mesh.material as THREE.Material[]));
      } else if ((mesh as THREE.Mesh).isMesh && mesh.material) {
        mats.push(mesh.material as THREE.Material);
      }
    });
    return mats;
  };

  /** bangun timeline (sekali) setelah scene & DOM siap */
  const ready = useCallback(
    (t: UnboxingTargets) => {
      targets.current = t;
      const { boxGroup, lidGroup, camera, lookAt, showcase } = t;
      if (!boxGroup || !lidGroup || !camera || !lookAt || !showcase) return;

      const materials = collectMaterials(boxGroup);
      const fade = { o: 1 };

      // posisi absolut tiap fase — bebas dari anchor "akhir timeline"
      const tCelebrating = TIMING.confettiDelay + TIMING.opening * 0.55;
      const tRevealing = tCelebrating + TIMING.celebrating;
      const tCompleted = tRevealing + TIMING.revealing;

      const tl = gsap.timeline({ paused: true });
      timeline.current = tl;

      // ── OPENING ────────────────────────────────────────────────
      tl.call(() => onPhase("opening"), undefined, 0)
        .to(
          lidGroup.rotation,
          { x: (BOX.openAngle * Math.PI) / 180, duration: TIMING.opening, ease: "power2.inOut" },
          0,
        )
        // kamera mundur + naik dan titik pandang ikut terangkat, agar
        // lid yang terbuka penuh tetap proporsional di dalam canvas
        .to(
          camera.position,
          {
            x: t.cameraOpen[0],
            y: t.cameraOpen[1],
            z: t.cameraOpen[2],
            duration: TIMING.cameraZoom,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          lookAt,
          { y: t.lookYOpen, duration: TIMING.cameraZoom, ease: "power1.inOut" },
          0,
        );

      // ── CELEBRATING ────────────────────────────────────────────
      tl.call(() => {
          onPhase("celebrating");
          onBurst();
        }, undefined, tCelebrating);

      // ── REVEALING ──────────────────────────────────────────────
      tl.call(() => onPhase("revealing"), undefined, tRevealing)
        .to(
          fade,
          {
            o: 0,
            duration: TIMING.revealing * 0.9,
            ease: "power1.in",
            onUpdate: () => {
              for (const m of materials) (m as THREE.MeshStandardMaterial).opacity = fade.o;
              boxGroup.scale.setScalar(0.55 + fade.o * 0.45);
            },
          },
          tRevealing,
        )
        .to(
          t.canvasWrap ?? {},
          { autoAlpha: 0, duration: TIMING.revealing * 0.8, ease: "power1.in" },
          tRevealing + TIMING.revealing * 0.2,
        )
        .fromTo(
          showcase,
          { autoAlpha: 0, scale: 0.3, y: 34 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: TIMING.revealing,
            ease: "back.out(1.4)",
          },
          tRevealing,
        );

      // ── COMPLETED ──────────────────────────────────────────────
      tl.call(() => onPhase("completed"), undefined, tCompleted);
    },
    [onPhase, onBurst],
  );

  /** float idle lembut pada group pembungkus */
  const startFloat = useCallback((floatGroup: THREE.Group) => {
    floatTween.current?.kill();
    floatTween.current = gsap.to(floatGroup.position, {
      y: "+=0.09",
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  /** hover: box terangkat sedikit (grup terpisah — nilai absolut, bebas drift) */
  const setHover = useCallback((on: boolean) => {
    if (started.current || !targets.current?.hoverGroup) return;
    hoverTween.current?.kill();
    hoverTween.current = gsap.to(targets.current.hoverGroup.position, {
      y: on ? 0.15 : 0,
      duration: 0.45,
      ease: "power2.out",
    });
  }, []);

  /** jalankan pengalaman — sekali saja, tidak bisa restart */
  const start = useCallback(() => {
    if (started.current || !timeline.current) return false;
    started.current = true;
    floatTween.current?.kill();
    hoverTween.current?.kill();
    timeline.current.play();
    return true;
  }, []);

  /** reduce-motion: lompat langsung ke hasil akhir tanpa animasi */
  const finishInstantly = useCallback(
    (t: UnboxingTargets) => {
      if (started.current) return;
      started.current = true;
      floatTween.current?.kill();
      hoverTween.current?.kill();
      if (t.lidGroup) t.lidGroup.rotation.x = (BOX.openAngle * Math.PI) / 180;
      if (t.camera) t.camera.position.set(...t.cameraOpen);
      if (t.lookAt) t.lookAt.y = t.lookYOpen;
      if (t.showcase) gsap.set(t.showcase, { autoAlpha: 1, scale: 1, y: 0 });
      if (t.canvasWrap) gsap.set(t.canvasWrap, { autoAlpha: 0 });
      onPhase("completed");
    },
    [onPhase],
  );

  useEffect(() => {
    return () => {
      timeline.current?.kill();
      floatTween.current?.kill();
      hoverTween.current?.kill();
    };
  }, []);

  /** identitas objek stabil — efek pemanggil tidak dibangun ulang tiap render */
  const api = useMemo(
    () => ({ ready, start, startFloat, setHover, finishInstantly, hasStarted: started }),
    [ready, start, startFloat, setHover, finishInstantly],
  );
  return api;
}
