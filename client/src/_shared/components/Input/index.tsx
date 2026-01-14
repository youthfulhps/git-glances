import React, { InputHTMLAttributes } from 'react';
import { ArrowRightIcon } from '@primer/octicons-react';
import { cn } from '@shared/lib/utils';

type InputProps = {
  isArrowShowing?: boolean;
  onArrowClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ isArrowShowing = false, onArrowClick, className, ...rest }: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      <input
        className={cn(
          'w-full rounded-xl bg-zinc-900 p-3 pr-8 font-light text-zinc-400 shadow-lg outline-0',
          className,
        )}
        {...rest}
      />

      {isArrowShowing && onArrowClick ? (
        <button onClick={onArrowClick} tabIndex={-1}>
          <ArrowRightIcon
            size={20}
            className="absolute right-3 top-3 animate-rising bg-gradient-to-r from-transparent to-zinc-800 fill-emerald-300 hover:fill-emerald-200"
          />
        </button>
      ) : null}
    </div>
  );
}

export default Input;
