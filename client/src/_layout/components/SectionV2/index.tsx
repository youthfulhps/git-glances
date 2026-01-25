import { ReactNode } from 'react';
import { Card, CardContent } from '@shared/components/ui/card';
import { cn } from '@shared/lib/utils';
import { ArrowRightIcon } from '@primer/octicons-react';

type SectionV2Props = {
  children: ReactNode;
  className?: string;
  gridArea?: string;
  hasBackground?: boolean;
  hasBorder?: boolean;
  hasArrow?: boolean;
  onClick?: () => void;
};

function SectionV2({
  children,
  className,
  gridArea,
  hasBackground = true,
  hasBorder = true,
  hasArrow = true,
  onClick,
}: SectionV2Props) {
  return (
    <Card
      className={cn(
        hasBackground ? 'bg-zinc-800' : '',
        `relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2
        overflow-hidden ${hasBorder ? 'rounded-2xl border-zinc-600' : 'rounded-none border-none'}
        text-zinc-200`,
        'group hover:border-zinc-400 hover:[&>svg]:translate-x-2',
        className,
      )}
      style={{ gridArea }}
      onClick={onClick}
    >
      <CardContent className={cn('w-full flex-1 p-3')}>{children}</CardContent>
      {hasArrow && (
        <ArrowRightIcon className="absolute bottom-0 right-3 -translate-y-1/2 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      )}
    </Card>
  );
}

export default SectionV2;
