import { AnchorHTMLAttributes } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const StyledLink = styled.a`
  ${tw`rounded-2xl border border-solid border-zinc-300`};
  ${tw`text-zinc-300 text-xs`};
  ${tw`p-1.5`};
  ${tw`backdrop-blur`};
  ${tw`hover:text-zinc-400`};
`;

function Link({ children, ...anchorProps }: LinkProps) {
  return (
    <StyledLink {...anchorProps} target="_blank">
      {children}
    </StyledLink>
  );
}

export default Link;
