import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightElement?: React.ReactNode;
  timer?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, rightElement, timer, containerClassName, className, ...props }, ref) => {
    return (
      <div className={cn('input-label-group', containerClassName)}>
        {label && <span className="input-caption">{label}</span>}
        <div className="input-row">
          <input
            ref={ref}
            className={cn('input-field', className)}
            style={{ paddingRight: rightElement || timer ? '110px' : '16px' }}
            {...props}
          />
          {timer && <span className="input-timer">{timer}</span>}
          {rightElement && (
            <div className="absolute right-2 flex items-center h-full">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
