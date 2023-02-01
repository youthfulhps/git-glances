import React, { InputHTMLAttributes } from 'react';
import { ArrowRightIcon } from '@primer/octicons-react';

type InputProps = {
  isArrowShowing?: boolean;
  onArrowClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ isArrowShowing = false, onArrowClick, className, ...rest }: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      <input
        className={`w-full rounded-xl bg-zinc-800 p-3 font-light text-zinc-400 shadow-lg outline-0 ${className}`}
        {...rest}
      />
      {isArrowShowing && onArrowClick ? (
        <button onClick={onArrowClick} tabIndex={-1}>
          <ArrowRightIcon
            size={20}
            className="absolute top-3 right-4 animate-rising fill-emerald-300 hover:fill-emerald-200"
          />
        </button>
      ) : null}
    </div>
  );
}

export default Input;
