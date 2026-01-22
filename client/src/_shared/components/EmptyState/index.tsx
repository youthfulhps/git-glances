import React, { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex h-full w-full min-h-[200px] items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-lg border border-zinc-700/50 bg-zinc-800/30 px-8 py-12 text-center">
        {icon && <div className="text-zinc-500">{icon}</div>}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          {description && <p className="text-xs text-zinc-500">{description}</p>}
        </div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}

export default EmptyState;
