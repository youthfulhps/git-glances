import React from 'react';
import { ContributionWeek, ContributionLevel } from '@shared/apis/contribution/types';
import classNames from 'classnames';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/components/ui/tooltip';
import { useBoard } from '@shared/contexts/BoardContext';

type ContributionHeatmapProps = {
  weeks: ContributionWeek[];
};

const getLevelColor = (level: ContributionLevel): string => {
  switch (level) {
    case 'NONE':
      return 'bg-zinc-800 border-zinc-700';
    case 'FIRST_QUARTILE':
      return 'bg-emerald-900/50 border-emerald-800/50';
    case 'SECOND_QUARTILE':
      return 'bg-emerald-700/60 border-emerald-600/60';
    case 'THIRD_QUARTILE':
      return 'bg-emerald-500/70 border-emerald-400/70';
    case 'FOURTH_QUARTILE':
      return 'bg-emerald-400 border-emerald-300';
    default:
      return 'bg-zinc-800 border-zinc-700';
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

function ContributionHeatmap({ weeks }: ContributionHeatmapProps) {
  const { openContributionBoard } = useBoard();

  // 최근 16주만 표시 (약 4개월)
  const recentWeeks = weeks.slice(-16);

  const handleDayClick = (date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    openContributionBoard(date);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="grid h-full w-full grid-cols-[repeat(16,1fr)] gap-1 rounded-md bg-zinc-900/30">
        {recentWeeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid h-full grid-rows-7 gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <Tooltip key={dayIndex}>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => handleDayClick(day.date, e)}
                    className={classNames(
                      `h-full w-full cursor-pointer rounded-sm border transition-all hover:scale-110 hover:ring-1
                      hover:ring-emerald-400/50`,
                      getLevelColor(day.contributionLevel),
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="border-zinc-700 bg-zinc-800 text-xs text-zinc-200"
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="font-semibold">
                      {day.contributionCount === 0
                        ? 'No contributions'
                        : `${day.contributionCount} contribution${day.contributionCount > 1 ? 's' : ''}`}
                    </div>
                    <div className="text-zinc-400">{formatDate(day.date)}</div>
                    <div className="mt-1 text-[10px] text-emerald-400">Click to view details</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default ContributionHeatmap;
