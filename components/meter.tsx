"use client";

import { useEffect, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useEnterOnView } from "@/lib/use-enter-on-view";
import { cn } from "@/lib/utils";

type MeterProps = {
  /** Target fill percentage (0-100). */
  value: number;
  /** Seconds to wait after entering before the fill sweeps. */
  delay?: number;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const toneFor = (value: number) =>
  value >= 80
    ? "bg-accent"
    : value >= 50
      ? "bg-warning"
      : "bg-critical";

/**
 * Slim horizontal score bar used in the health breakdown.
 *
 * Track and fill reserve their space during hydration. The custom property
 * supplies the actual fill when JavaScript is disabled.
 * `prefers-reduced-motion` swaps the sweep for an instant fill.
 *
 * Like Reveal, the sweep is armed by a jump-proof rect watch and pinned to
 * its final width once the tween must have ended, so no scroll pattern can
 * strand a meter half-filled.
 */
export function Meter({ value, delay = 0 }: MeterProps) {
  const reduceMotion = useReducedMotion();
  const { ref, entered } = useEnterOnView<HTMLDivElement>({
    margin: 60,
    force: reduceMotion ?? false,
  });
  const fill = { width: `${value}%` };
  const rest = { width: 0 };

  // Same settle-pin as Reveal: after the sweep's deadline the width is owned
  // outright, guaranteeing the data reads back at its true value.
  useEffect(() => {
    if (!entered) return;
    const el = ref.current;
    if (!el) return;
    const ms = reduceMotion ? 0 : delay * 1000 + 900 + 250;
    const timer = window.setTimeout(() => {
      el.style.width = `${value}%`;
    }, ms);
    return () => window.clearTimeout(timer);
  }, [entered, reduceMotion, delay, value, ref]);

  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[rgb(var(--veil-rgb)/0.06)]">
      <motion.div
        ref={ref}
        data-meter-fill=""
        style={{ "--meter-value": `${value}%` } as CSSProperties}
        className={cn("h-full rounded-full", toneFor(value))}
        initial={rest}
        animate={entered ? fill : rest}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          delay: reduceMotion ? 0 : delay,
          ease: EASE,
        }}
      />
    </div>
  );
}
