import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl bg-zinc-800 p-3 font-light text-zinc-400 shadow-lg outline-0 ${className}`}
      {...rest}
    />
  );
}

export default Input;
