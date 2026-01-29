import React from 'react';
import { UserEvent } from '@shared/apis/user/types';
import { ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react';

type ProductivityInsightsProps = {
  events: UserEvent[];
};

function ProductivityInsights({ events }: ProductivityInsightsProps) {
  // Calculate date ranges
  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - now.getDay()); // Start of this week (Sunday)
  thisWeekStart.setHours(0, 0, 0, 0);

  const thisWeekEnd = new Date(thisWeekStart);
  thisWeekEnd.setDate(thisWeekStart.getDate() + 7);
  thisWeekEnd.setMilliseconds(-1);

  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(thisWeekStart.getDate() - 7);

  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setMilliseconds(-1);

  // Filter events
  const thisWeekEvents = events.filter(
    (e) => new Date(e.created_at) >= thisWeekStart && new Date(e.created_at) <= thisWeekEnd,
  );
  const lastWeekEvents = events.filter(
    (e) => new Date(e.created_at) >= lastWeekStart && new Date(e.created_at) <= lastWeekEnd,
  );

  // Calculate metrics
  const thisWeekCount = thisWeekEvents.length;
  const lastWeekCount = lastWeekEvents.length;
  const percentageChange =
    lastWeekCount === 0
      ? thisWeekCount > 0
        ? 100
        : 0
      : Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100);

  // Calculate unique days active
  const thisWeekActiveDays = new Set(
    thisWeekEvents.map((e) => new Date(e.created_at).toDateString()),
  ).size;
  const lastWeekActiveDays = new Set(
    lastWeekEvents.map((e) => new Date(e.created_at).toDateString()),
  ).size;

  // Calculate productivity score (0-100)
  const maxDaysInWeek = 7;
  const avgEventsPerDay = thisWeekActiveDays > 0 ? thisWeekCount / thisWeekActiveDays : 0;
  const consistencyScore = (thisWeekActiveDays / maxDaysInWeek) * 50; // 50 points for consistency
  const volumeScore = Math.min((avgEventsPerDay / 10) * 50, 50); // 50 points for volume (10+ events/day = max)
  const productivityScore = Math.round(consistencyScore + volumeScore);

  const getInsightMessage = () => {
    if (percentageChange > 50) {
      return 'Outstanding performance this week!';
    } else if (percentageChange > 20) {
      return 'Great progress! Keep up the momentum!';
    } else if (percentageChange > 0) {
      return 'Steady improvement, keep going!';
    } else if (percentageChange === 0) {
      return 'Maintaining consistency!';
    } else if (percentageChange > -20) {
      return 'Room for improvement, you got this!';
    } else {
      return 'Consider setting smaller goals this week!';
    }
  };

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900
        via-zinc-900/80 to-zinc-950 p-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200">Productivity Insights</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-zinc-500">Score</span>
          <span className="text-lg font-semibold text-zinc-100">{productivityScore}</span>
          <span className="text-xs text-zinc-500">/100</span>
        </div>
      </div>

      {/* Insight Message */}
      <p className="text-sm text-zinc-400">{getInsightMessage()}</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* This Week */}
        <div className="flex flex-col gap-1.5 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-2.5">
          <span className="text-xs text-zinc-500">This Week</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold text-zinc-100">{thisWeekCount}</span>
            <span className="text-xs text-zinc-500">events</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-500">{thisWeekActiveDays} active days</span>
          </div>
        </div>

        {/* Last Week */}
        <div className="flex flex-col gap-1.5 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-2.5">
          <span className="text-xs text-zinc-500">Last Week</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold text-zinc-100">{lastWeekCount}</span>
            <span className="text-xs text-zinc-500">events</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-500">{lastWeekActiveDays} active days</span>
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center justify-center gap-2 rounded-md border border-zinc-700/50 bg-zinc-800/30 p-2">
        {percentageChange > 0 ? (
          <>
            <ArrowUpIcon size={16} className="fill-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">+{percentageChange}%</span>
            <span className="text-xs text-zinc-500">vs last week</span>
          </>
        ) : percentageChange < 0 ? (
          <>
            <ArrowDownIcon size={16} className="fill-red-400" />
            <span className="text-sm font-medium text-red-400">{percentageChange}%</span>
            <span className="text-xs text-zinc-500">vs last week</span>
          </>
        ) : (
          <>
            <span className="text-sm font-medium text-zinc-400">No change</span>
            <span className="text-xs text-zinc-500">vs last week</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductivityInsights;
