import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';

type StyledOptionalSectionProps = {
  gridArea?: string;
  hasOverlay: boolean;
};

type OptionalSectionProps = {
  children: ReactNode;
  className?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
} & StyledOptionalSectionProps;

const StyledOptionalSection = styled.section<StyledOptionalSectionProps>`
  ${tw`flex flex-col h-full w-full p-4 rounded-2xl relative`}
  ${tw`bg-zinc-800 text-zinc-100`}

  grid-area: ${({ gridArea }) => `${gridArea}`};

  h2 {
    ${tw`text-xl font-thin`}
    ${tw`drop-shadow-md`}
  }

  .inner {
    ${tw`flex flex-col justify-end w-full h-full`}
  }

  .overlay {
    ${tw`hidden`}
    ${({ hasOverlay }) =>
      hasOverlay &&
      tw`absolute bottom-0 left-0 w-full h-full rounded-2xl bg-gradient-to-t from-zinc-700`};
    ${({ hasOverlay }) =>
      hasOverlay &&
      tw`block flex flex-col justify-end items-end w-full h-full p-4`};

    svg {
      ${tw`cursor-pointer`}

      &:hover {
        ${tw`opacity-80`}
      }
    }
  }
`;

function OptionalSection({
  children,
  className,
  gridArea,
  hasOverlay,
  onConfirm,
  onCancel,
}: OptionalSectionProps) {
  return (
    <StyledOptionalSection
      className={className}
      gridArea={gridArea}
      hasOverlay={hasOverlay}
    >
      <h2>{`# ${gridArea}`}</h2>
      <div className="inner">{children}</div>
      <div className="overlay">
        <div className="flex items-center">
          <button onClick={onConfirm}>
            <CheckCircleFillIcon size={24} className="mr-1 fill-emerald-500" />
          </button>
          <button onClick={onCancel}>
            <XCircleFillIcon size={24} className="fill-red-400" />
          </button>
        </div>
      </div>
    </StyledOptionalSection>
  );
}

export default OptionalSection;
