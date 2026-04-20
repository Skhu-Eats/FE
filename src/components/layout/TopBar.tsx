import React from 'react';
import { Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  showLogo?: boolean;
  className?: string;
}

export const TopBar = ({
  title,
  leftAction,
  rightAction,
  showLogo = true,
  className,
}: TopBarProps) => {
  return (
    <header className={cn('top-bar', className)}>
      <div className="bar-logo-group">
        {showLogo && (
          <div className="logo-pill">
            <Utensils className="w-4 h-4 text-white" />
          </div>
        )}
        {title ? (
          <span className="logo-name">{title}</span>
        ) : (
          showLogo && <span className="logo-name">밥친구</span>
        )}
      </div>
      {leftAction && <div className="bar-btn">{leftAction}</div>}
      {rightAction && <div className="bar-action">{rightAction}</div>}
    </header>
  );
};
