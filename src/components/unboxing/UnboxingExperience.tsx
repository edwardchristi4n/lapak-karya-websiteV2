import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useUnboxingAnimation } from "../../hooks/useUnboxingAnimation";
import { ShowcaseReveal } from "./ShowcaseReveal";
import { UnboxingLoader } from "./UnboxingLoader";
import {
  isWebGLAvailable,
  CAMERA,
  unboxingTier,
  type UnboxingPhase,
} from "./unboxingConfig";

const Scene3D = lazy(() => import("./Scene3D"));

/** jeda setelah scene siap sebelum unboxing berjalan sendiri (ms) */
const AUTO_START_DELAY = 700;

/**
 * Pengalaman unboxing 3D Lapak Karya: box rigid prosedural tampil sebentar,
 * lalu OTOMATIS terbuka + confetti meledak setiap kali halaman dibuka —
 * tanpa klik. Showcase foto kemudian mengambil alih komposisi hero.
 * Fallback (non-WebGL) ditentukan pemanggil — biasanya galeri hero lama.
 */
export function UnboxingExperience({
  fallback,
}: {
  fallback: ReactNode;
}) {
  const webgl = useMemo(() => isWebGLAvailable(), []);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<UnboxingPhase>("idle");
  const [burst, setBurst] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const hoverRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  /** titik pandang kamera — di-tween timeline saat box terbuka */
  const lookAtRef = useRef(new THREE.Vector3(0, 0.8, 0));
  const [inView, setInView] = useState(true);
  const tier = useMemo(() => unboxingTier(), []);
  const camCfg = tier.mobile ? CAMERA.mobile : CAMERA.desktop;

  const handleBurst = useCallback(() => setBurst((b) => b + 1), []);
  const anim = useUnboxingAnimation(setPhase, handleBurst);

  // pause rendering saat keluar viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // bangun timeline begitu scene siap, lalu MAINKAN OTOMATIS: box tampil
  // tertutup sesaat, membuka diri, confetti meledak, showcase muncul.
  // reduce-motion: langsung ke hasil akhir tanpa animasi.
  useEffect(() => {
    if (!sceneReady) return;
    const targets = () => ({
      boxGroup: boxRef.current,
      floatGroup: floatRef.current,
      hoverGroup: hoverRef.current,
      lidGroup: lidRef.current,
      camera: cameraRef.current,
      lookAt: lookAtRef.current,
      cameraOpen: camCfg.open,
      lookYOpen: camCfg.openLookY,
      showcase: showcaseRef.current,
      canvasWrap: canvasWrapRef.current,
    });
    anim.ready(targets());
    if (!reduced && floatRef.current) anim.startFloat(floatRef.current);

    if (reduced) {
      const id = window.setTimeout(() => anim.finishInstantly(targets()), 300);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => anim.start(), AUTO_START_DELAY);
    return () => window.clearTimeout(id);
  }, [sceneReady, reduced, anim, camCfg]);

  const onCameraReady = useCallback((camera: THREE.PerspectiveCamera) => {
    cameraRef.current = camera;
    setSceneReady(true);
  }, []);

  if (!webgl) return <>{fallback}</>;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      <div ref={canvasWrapRef} className="absolute inset-0">
        <Suspense fallback={<UnboxingLoader />}>
          <Scene3D
            phase={phase}
            burst={burst}
            boxRef={boxRef}
            lidRef={lidRef}
            floatRef={floatRef}
            hoverRef={hoverRef}
            lookAtRef={lookAtRef}
            cameraBase={camCfg.base}
            cameraFov={camCfg.fov}
            tier={tier}
            onCameraReady={onCameraReady}
            onBoxHover={(on) => anim.setHover(on)}
            inView={inView}
          />
        </Suspense>
      </div>

      <ShowcaseReveal innerRef={showcaseRef} revealed={phase !== "idle"} />
    </div>
  );
}
