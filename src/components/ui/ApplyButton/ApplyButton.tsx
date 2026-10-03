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
