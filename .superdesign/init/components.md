# Shared UI primitives

Framework: React 19 + Vite 8. CSS: Sass modules + CSS custom properties (`src/styles/_tokens.scss`). Icons: `@phosphor-icons/react`. Motion: `framer-motion` via `src/motion` (`m.*` + `LazyMotion`). No Tailwind, shadcn, Radix, or MUI.

Shared primitives live in `src/components/ui/` and are re-exported from `src/components/ui/index.ts`.

---

## Button

- Path: `src/components/ui/Button/Button.tsx`
- Styles: `src/components/ui/Button/Button.module.scss`
- Description: Polymorphic CTA (button or anchor) with primary / secondary / secondary-on-dark variants and optional trailing icon.
- Key props: `variant?: 'primary' | 'secondary' | 'secondary-on-dark'`, `size?: 'md' | 'lg'`, `icon?: ReactNode`, `href?: string`, `children`

```tsx
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'secondary-on-dark';
type Size = 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className, children, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(' ');

    if ('href' in rest && rest.href !== undefined) {
      const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorProps}
        >
          {children}
          {icon && <span className={styles.icon}>{icon}</span>}
        </a>
      );
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {children}
        {icon && <span className={styles.icon}>{icon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
```

```scss
@use '../../../styles/mixins';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-primary);
  font-weight: 600;
  white-space: nowrap;
  transition:
    background-color var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    color var(--duration-base) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);

  @include mixins.focus-ring;

  &:active {
    transform: scale(0.97);
  }
}

.md {
  padding: 12px 24px;
  font-size: var(--fs-button);
  min-height: 44px;
}

.lg {
  padding: 16px 30px;
  font-size: 1rem;
  min-height: 52px;
}

.icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
}

.primary {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--color-accent);
  color: var(--color-on-accent);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      105deg,
      transparent 32%,
      rgba(255, 255, 255, 0.55) 50%,
      transparent 68%
    );
    transform: translateX(-130%);
    pointer-events: none;
    transition: transform 0.45s var(--ease-standard);
  }

  &:hover {
    background: var(--color-accent-deep);
    box-shadow: 0 8px 28px rgba(0, 237, 100, 0.35);

    &::before {
      transform: translateX(130%);
      transition-duration: 0.7s;
    }
  }

  &:active {
    background: var(--color-accent-pressed);
  }
}

.secondary {
  background: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-hairline-strong);

  &:hover {
    border-color: var(--color-ink);
    background: var(--color-surface);
  }
}

.secondary-on-dark {
  background: transparent;
  color: var(--color-on-dark);
  border: 1px solid var(--color-hairline-dark);

  &:hover {
    border-color: var(--color-on-dark-muted);
    background: rgba(255, 255, 255, 0.06);
  }
}

@include mixins.reduced-motion {
  .button,
  .primary::before {
    transition: none;
  }

  .primary::before {
    display: none;
  }
}
```

---

## ApplyButton

- Path: `src/components/ui/ApplyButton/ApplyButton.tsx`
- Description: Primary apply CTA that opens the Telegram mini-app apply form with a source tag and Metrika goal.
- Key props: `source: 'header' | 'hero' | 'final'`, `children`, `size?`, `variant?`

```tsx
import type { ReactNode } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { METRIKA_GOALS, reachGoal } from '../../../data/analytics';
import { applyLink } from '../../../data/contacts';
import type { ApplySource } from '../../../data/contacts';
import { Button } from '../Button/Button';

const GOALS: Record<ApplySource, string> = {
  header: METRIKA_GOALS.applyHeader,
  hero: METRIKA_GOALS.applyHero,
  final: METRIKA_GOALS.applyFinal,
};

interface ApplyButtonProps {
  source: ApplySource;
  children: ReactNode;
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'secondary-on-dark';
  className?: string;
}

export function ApplyButton({
  source,
  children,
  size = 'lg',
  variant = 'primary',
  className,
}: ApplyButtonProps) {
  return (
    <Button
      href={applyLink(source)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      icon={<PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />}
      onClick={() => reachGoal(GOALS[source])}
    >
      {children}
    </Button>
  );
}
```

---

## ManagerButton

- Path: `src/components/ui/ManagerButton/ManagerButton.tsx`
- Description: Secondary CTA that opens the manager Telegram chat.
- Key props: `size?: 'md' | 'lg'`, `variant?: 'secondary' | 'secondary-on-dark'`

```tsx
import { ChatCircleText } from '@phosphor-icons/react';
import { METRIKA_GOALS, reachGoal } from '../../../data/analytics';
import { MANAGER_LABEL, TELEGRAM_URL } from '../../../data/contacts';
import { Button } from '../Button/Button';

interface ManagerButtonProps {
  size?: 'md' | 'lg';
  variant?: 'secondary' | 'secondary-on-dark';
  className?: string;
}

export function ManagerButton({
  size = 'lg',
  variant = 'secondary',
  className,
}: ManagerButtonProps) {
  return (
    <Button
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      icon={<ChatCircleText size={18} weight="bold" aria-hidden="true" />}
      onClick={() => reachGoal(METRIKA_GOALS.contactManager)}
    >
      {MANAGER_LABEL}
    </Button>
  );
}
```

---

## Container

- Path: `src/components/ui/Container/Container.tsx`
- Description: Width-constrained page wrapper using the global `.container` class.
- Key props: `as?: ElementType` (default `div`), `className?`, `children`

```tsx
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  const classes = ['container', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
```

---

## Magnetic

- Path: `src/components/ui/Magnetic/Magnetic.tsx`
- Description: Mouse-only magnetic pull wrapper (disabled for touch and reduced motion).
- Key props: `children`, `className?`

```tsx
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from '../../../motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

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
```

---

## SocialLinks

- Path: `src/components/ui/SocialLinks/SocialLinks.tsx`
- Styles: `src/components/ui/SocialLinks/SocialLinks.module.scss`
- Description: “Мы в соц сетях” label plus a circular Telegram icon button; optional glass frame for dark backgrounds.
- Key props: `size?: 'md' | 'lg'`, `framed?: boolean`

```tsx
import { TelegramLogo } from '@phosphor-icons/react';
import { TELEGRAM_URL } from '../../../data/contacts';
import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
  size?: 'md' | 'lg';
  framed?: boolean;
  className?: string;
}

export function SocialLinks({ size = 'md', framed = false, className }: SocialLinksProps) {
  const classes = [styles.wrapper, styles[size], framed && styles.framed, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className={styles.label}>Мы в соц сетях</span>
      <div className={styles.icons}>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="Написать нам в Telegram"
        >
          <TelegramLogo size={20} weight="fill" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
```

```scss
@use '../../../styles/mixins';

.wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.framed {
  padding: 10px var(--space-lg);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-hairline-dark);
  border-radius: var(--radius-full);
}

.framed.lg {
  padding: 12px var(--space-xl);
}

.label {
  font-size: var(--fs-button);
  font-weight: 600;
  color: var(--color-on-dark);
  white-space: nowrap;
}

.icons {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.iconLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: var(--color-on-accent);
  transition:
    background-color var(--duration-base) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);

  @include mixins.focus-ring;

  &:hover {
    background: var(--color-accent-deep);
  }

  &:active {
    transform: scale(0.94);
  }
}

.md .iconLink {
  width: 40px;
  height: 40px;
}

.lg .iconLink {
  width: 48px;
  height: 48px;
}
```

---

## Barrel

- Path: `src/components/ui/index.ts`

```ts
export { ApplyButton } from './ApplyButton/ApplyButton';
export { ManagerButton } from './ManagerButton/ManagerButton';
export { Button } from './Button/Button';
export { Container } from './Container/Container';
export { Magnetic } from './Magnetic/Magnetic';
export { SocialLinks } from './SocialLinks/SocialLinks';
```
