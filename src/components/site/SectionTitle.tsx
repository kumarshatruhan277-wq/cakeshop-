import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  children,
  light,
}: {
  eyebrow?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-10">
      {eyebrow && (
        <p className={`uppercase tracking-[0.4em] text-xs mb-2 ${light ? "text-gold" : "text-primary"}`}>{eyebrow}</p>
      )}
      <h2 className={`font-display text-3xl md:text-4xl ${light ? "text-cream" : "text-foreground"}`}>{children}</h2>
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="h-px w-10 bg-primary/50" />
        <span className="text-gold">✦</span>
        <span className="h-px w-10 bg-primary/50" />
      </div>
    </div>
  );
}
