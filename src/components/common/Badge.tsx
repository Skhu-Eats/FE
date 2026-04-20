import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 
  | 'urgent' 
  | 'active' 
  | 'closed' 
  | 'time' 
  | 'primary' 
  | 'cat' 
  | 'food';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ children, className, variant = 'primary', ...props }: BadgeProps) => {
  const variantClasses: Record<BadgeVariant, string> = {
    urgent: 'badge-urgent',
    active: 'badge-active',
    closed: 'badge-closed',
    time: 'badge-time',
    primary: 'badge-primary',
    cat: 'badge-cat',
    food: 'badge-food',
  };

  return (
    <span className={cn('badge', variantClasses[variant], className)} {...props}>
      {children}
    </span>
  );
};
