"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const maxTilt = 8;
const spring = { stiffness: 150, damping: 15 };

type TiltProps = {
  children: ReactNode;
  className?: string;
};

export function Tilt({ children, className }: TiltProps) {
  const reduceMotion = useReducedMotion();
  // Pointer position relative to the element's center, from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Sprung once and shared, so the tilt and the glare ease back together
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Light spot that follows the pointer and fades in while hovering
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, spring);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.4), transparent 60%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    // Touch has no hover, so a tap would leave the element stuck tilted
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{ background: glareBackground, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
