import { useRef, type PointerEvent, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from '../../../motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

/**
 * Лёгкий сдвиг к курсору. Только мышь: на тач-экране жест не нужен и мешает тапу.
 */
export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.35 });

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;

    const box = ref.current.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    x.set(Math.max(-12, Math.min(12, dx * 0.28)));
    y.set(Math.max(-8, Math.min(8, dy * 0.28)));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </m.div>
  );
}
