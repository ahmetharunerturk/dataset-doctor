import type { ReactNode } from "react";

/**
 * Shared rich-text tag mappers for translated headings and copy.
 *
 * Keeps the typographic treatment of emphasised words (serif italic),
 * inline code spans and deliberate line breaks identical across locales
 * while letting every locale choose its own wording and line wrapping.
 */
export const richTags = {
  em: (chunks: ReactNode) => <em className="pe-1 font-serif italic">{chunks}</em>,
  strong: (chunks: ReactNode) => (
    <span className="text-foreground/90">{chunks}</span>
  ),
  code: (chunks: ReactNode) => (
    <span dir="ltr" className="font-mono text-[0.84em] tracking-[-0.03em] text-accent-text">
      {chunks}
    </span>
  ),
  /** Explicitly-LTR fragments embedded in RTL copy (ratios, commands, IDs). */
  ltr: (chunks: ReactNode) => <bdi dir="ltr">{chunks}</bdi>,
  hi: (chunks: ReactNode) => <span className="text-accent-text">{chunks}</span>,
  lbl: (chunks: ReactNode) => (
    <span className="font-mono text-[0.72em] tracking-[0.18em] text-accent-text uppercase">
      {chunks}
    </span>
  ),
  br: () => <br />,
};