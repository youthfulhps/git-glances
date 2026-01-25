import React, { ReactNode } from 'react';
import { UserEvent } from '@shared/apis/user/types';
import {
  GitCommitIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  StarIcon,
  GitBranchIcon,
  RepoIcon,
  CommentIcon,
} from '@primer/octicons-react';
import { cn } from '@shared/lib/utils';

type ActivityTimelineProps = {
  events: UserEvent[];
};

type EventTypeStat = {
  type: string;
  label: string;
  count: number;
  icon: ReactNode;
  color: string;
  bgColor: string;
};

function ActivityTimeline({ events }: ActivityTimelineProps) {
  const eventTypeConfig: Record<
    string,
    { label: string; icon: ReactNode; color: string; bgColor: string }
  > = {
    PushEvent: {
      label: 'Push',
      icon: <GitCommitIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    PullRequestEvent: {
      label: 'PR',
      icon: <GitPullRequestIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    IssuesEvent: {
      label: 'Issues',
      icon: <IssueOpenedIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    WatchEvent: {
      label: 'Star',
      icon: <StarIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    CreateEvent: {
      label: 'Create',
      icon: <GitBranchIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    ForkEvent: {
      label: 'Fork',
      icon: <RepoIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
    IssueCommentEvent: {
      label: 'Comment',
      icon: <CommentIcon size={12} />,
      color: 'text-zinc-400',
      bgColor: 'bg-zinc-400/40',
    },
  };

  // Count events by type
  const eventCounts: Record<string, number> = {};
  events.forEach((event) => {
    eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
  });

  // Create stats array
  const stats: EventTypeStat[] = Object.entries(eventCounts)
    .map(([type, count]) => ({
      type,
      label: eventTypeConfig[type]?.label || type,
      count,
      icon: eventTypeConfig[type]?.icon || <GitCommitIcon size={12} />,
      color: eventTypeConfig[type]?.color || 'text-zinc-400',
      bgColor: eventTypeConfig[type]?.bgColor || 'bg-zinc-400/20',
    }))
    .sort((a, b) => b.count - a.count);

  const totalEvents = events.length;
  const maxCount = Math.max(...stats.map((s) => s.count));

  if (totalEvents === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 p-6">
        <p className="text-sm text-zinc-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-300">Activity Overview</span>
        <span className="text-[10px] text-zinc-500">{totalEvents} events</span>
      </div>
      <div className="flex flex-col gap-1">
        {stats.slice(0, 6).map((stat) => {
          const percentage = (stat.count / maxCount) * 100;

          return (
            <div key={stat.type} className="flex flex-row items-center gap-1">
              <div className="flex flex-1 items-center gap-1">
                <span className="w-16 truncate text-ellipsis text-[10px] text-zinc-500">
                  {stat.label}
                </span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-md bg-zinc-700/50">
                  <div
                    className={cn('h-full bg-zinc-400/40 transition-all duration-500')}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-zinc-300">
                  {stat.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityTimeline;
