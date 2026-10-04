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
