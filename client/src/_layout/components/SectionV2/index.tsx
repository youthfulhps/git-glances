import { ReactNode } from 'react';
import { Card, CardContent } from '@shared/components/ui/card';
import { cn } from '@shared/lib/utils';

type SectionV2Props = {
  children: ReactNode;
  className?: string;
  gridArea?: string;
  hasBackground?: boolean;
};

function SectionV2({ children, className, gridArea, hasBackground = true }: SectionV2Props) {
  return (
    <Card
      className={cn(
        hasBackground ? 'bg-zinc-800' : '',
        `relative flex h-full w-full flex-col items-center justify-center gap-y-2 overflow-hidden rounded-2xl
          border-zinc-600 text-zinc-200`,
        className,
      )}
      style={{ gridArea }}
    >
      <CardContent className={cn('w-full flex-1 p-3')}>{children}</CardContent>
    </Card>
  );
}

export default SectionV2;
