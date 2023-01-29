import React, { TextareaHTMLAttributes } from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      className={`w-full resize-none rounded-xl bg-zinc-800 p-3 text-xs font-light text-zinc-400 shadow-lg outline-0 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-full ${className}`}
      {...rest}
    />
  );
}

export default TextArea;
