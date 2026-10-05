"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useEnterOnView } from "@/lib/use-enter-on-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after entering before the slide starts. */
  delay?: number;
  /** Entrance distance in pixels. */
  y?: number;
};

const ENTER = { opacity: 1, y: 0 };
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Fade-and-rise entrance driven by scroll position.
 *
 * The animated values are identical on server and client (so SSR styles match
 * on hydration); `prefers-reduced-motion` only swaps the entrance for an
 * immediate, zero-duration appearance.
 *
 * The entrance is armed by a jump-proof rect watch (`useEnterOnView`) instead
 * of an IntersectionObserver sample, and is pinned to its final style shortly
 * after its tween must have ended — so no scroll jump, throttled tab, or
 * awkwardly timed capture can ever freeze a section mid-fade.
 */
export function Reveal({ children, className, delay = 0, y = 10 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, entered } = useEnterOnView<HTMLDivElement>({
    margin: 72,
    force: reduceMotion ?? false,
  });
  const rest = { opacity: 0, y };

  // Hard deadline: once the entrance has had its full time, own the final
  // style so a stalled animation frame can never leave content faded away.
  useEffect(() => {
    if (!entered) return;
    const el = ref.current;
    if (!el) return;
    const ms = reduceMotion ? 0 : delay * 1000 + 320 + 250;
    const timer = window.setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    }, ms);
    return () => window.clearTimeout(timer);
  }, [entered, reduceMotion, delay, ref]);

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={cn("min-w-0", className)}
      initial={rest}
      animate={entered ? ENTER : rest}
      transition={{
        duration: reduceMotion ? 0 : 0.32,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
