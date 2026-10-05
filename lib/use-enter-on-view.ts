"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Watch = {
  el: HTMLElement;
  margin: number;
  fire: () => void;
};

/** Entrances still waiting for their cue, shared across every consumer. */
const watches = new Set<Watch>();
let listening = false;
let scheduled = false;

function sweep() {
  scheduled = false;
  const viewportHeight = window.innerHeight;
  for (const watch of Array.from(watches)) {
    const rect = watch.el.getBoundingClientRect();
    // A normal scroll walks `top` under the shrunk viewport floor. A jump
    // (anchor link, PageUp/PageDown, scrollbar drag, restored position) can
    // carry an element above the fold entirely between two observer samples —
    // that must also count as "seen", or the element stays hidden forever.
    if (rect.top < viewportHeight - watch.margin) {
      watches.delete(watch);
      watch.fire();
    }
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(sweep);
}

function listen() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

/**
 * Jump-proof "scrolled into view" trigger, fired at most once.
 *
 * `whileInView`'s IntersectionObserver samples at discrete moments; fast
 * scroll jumps can carry an element entirely past the sampling window and
 * strand it in its pre-entrance style (invisible). This watches real element
 * rects on scroll/resize instead and treats "top has reached the shrunk
 * viewport floor *or* sits anywhere above the fold" as entered, so no scroll
 * pattern — however violent — can freeze a reveal halfway.
 *
 * `force` enters immediately (used for `prefers-reduced-motion`).
 */
export function useEnterOnView<E extends HTMLElement>({
  margin = 72,
  force = false,
}: { margin?: number; force?: boolean } = {}): {
  ref: RefObject<E | null>;
  entered: boolean;
} {
  const ref = useRef<E | null>(null);
  const [detected, setDetected] = useState(false);
  const entered = force || detected;

  useEffect(() => {
    if (entered) return;
    const el = ref.current;
    if (!el) return;
    const watch: Watch = { el, margin, fire: () => setDetected(true) };
    watches.add(watch);
    listen();
    schedule();
    return () => {
      watches.delete(watch);
    };
  }, [entered, margin, force]);

  return { ref, entered };
}