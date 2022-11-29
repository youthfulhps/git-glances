import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  ${tw`bg-zinc-900 text-zinc-100 font-bold py-4 px-6 rounded-2xl w-full`};
  ${tw`hover:bg-zinc-600`}
`;

function Button({ children, ...buttonProps }: ButtonProps) {
  return <StyledButton {...buttonProps}>{children}</StyledButton>;
}

export default Button;
