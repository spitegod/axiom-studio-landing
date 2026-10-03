import { div, h1, li, p, span, ul } from 'framer-motion/m';

export {
  LazyMotion,
  MotionConfig,
  domAnimation,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

/**
 * Только теги, которые реально анимируются. Полный `motion` из `motion/react`
 * тянет жесты, drag и layout-анимации, которые странице не нужны.
 * Компоненты `m.*` ожидают `<LazyMotion features={domAnimation}>`.
 */
export const m = { div, h1, li, p, span, ul };
