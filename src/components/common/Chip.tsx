import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const Chip = ({ children, active, className, ...props }: ChipProps) => {
  return (
    <div
      className={cn('chip', active && 'active', className)}
      {...props}
    >
      {children}
    </div>
  );
};
