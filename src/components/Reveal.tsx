import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

export function Reveal({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} reveal ${visible ? "is-visible" : ""}`.trim()}
    >
      {children}
    </div>
  );
}
