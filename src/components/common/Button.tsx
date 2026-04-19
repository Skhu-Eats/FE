import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'weak-primary' | 'weak-danger' | 'grey';
  size?: 'md' | 'lg' | 'sm';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    'weak-primary': 'btn-weak-primary',
    'weak-danger': 'btn-weak-danger',
    grey: 'bg-grey-100 text-grey-700 hover:bg-grey-200',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-11 px-4 text-base',
    lg: 'h-14 px-5 text-lg',
  };

  return (
    <button
      className={cn(
        variantClasses[variant],
        fullWidth ? 'w-full' : 'w-auto',
        disabled && 'disabled',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
