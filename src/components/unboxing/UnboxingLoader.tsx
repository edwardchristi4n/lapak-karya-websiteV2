import { BoxLidIcon } from "../icons";

/** Placeholder saat chunk 3D lazy masih dimuat. */
export function UnboxingLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-4xl bg-gradient-to-br from-white to-cream-deep ring-1 ring-ink/10">
      <BoxLidIcon className="h-14 w-14 animate-pulse text-ink/20" />
    </div>
  );
}
