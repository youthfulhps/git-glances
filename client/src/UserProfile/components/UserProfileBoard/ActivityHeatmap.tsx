import React from 'react';
import { UserEvent } from '@shared/apis/user/types';

type ActivityHeatmapProps = {
  events: UserEvent[];
};

type HeatmapCell = {
  day: string;
  period: string;
  count: number;
  intensity: number;
};

function ActivityHeatmap({ events }: ActivityHeatmapProps) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const periods = [
    { label: 'Morning', start: 6, end: 12 },
    { label: 'Afternoon', start: 12, end: 18 },
    { label: 'Evening', start: 18, end: 24 },
    { label: 'Night', start: 0, end: 6 },
  ];

  // Initialize heatmap data
  const heatmapData: Record<string, Record<string, number>> = {};
  days.forEach((day) => {
    heatmapData[day] = {};
    periods.forEach((period) => {
      heatmapData[day][period.label] = 0;
    });
  });

  // Count events by day and time period
  events.forEach((event) => {
    const date = new Date(event.created_at);
    const dayIndex = date.getDay();
    const hour = date.getHours();
    const day = days[dayIndex];

    const period = periods.find(
      (p) => (hour >= p.start && hour < p.end) || (p.label === 'Night' && hour >= 0 && hour < 6),
    );

    if (period) {
      heatmapData[day][period.label]++;
    }
  });

  // Calculate max count for intensity scaling
  let maxCount = 0;
  Object.values(heatmapData).forEach((dayData) => {
    Object.values(dayData).forEach((count) => {
      maxCount = Math.max(maxCount, count);
    });
  });

  // Create cells array
  const cells: HeatmapCell[] = [];
  days.forEach((day) => {
    periods.forEach((period) => {
      const count = heatmapData[day][period.label];
      cells.push({
        day,
        period: period.label,
        count,
        intensity: maxCount > 0 ? count / maxCount : 0,
      });
    });
  });

  // Find peak activity
  const peakCell = cells.reduce((max, cell) => (cell.count > max.count ? cell : max), cells[0]);

  const getIntensityColor = (intensity: number) => {
    if (intensity === 0) return 'bg-zinc-800/30';
    if (intensity < 0.25) return 'bg-emerald-900/50';
    if (intensity < 0.5) return 'bg-emerald-700/60';
    if (intensity < 0.75) return 'bg-emerald-500/70';
    return 'bg-emerald-400';
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 p-6">
        <p className="text-sm text-zinc-500">No activity data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-300">Activity Heatmap</span>
        <span className="text-[10px] text-zinc-500">
          Peak: {peakCell.day} {peakCell.period}
        </span>
      </div>

      {/* Heatmap Grid */}
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-8 gap-1">
          <div className="text-[10px] text-zinc-500" />
          {days.map((day) => (
            <div key={day} className="text-center text-[10px] text-zinc-500">
              {day}
            </div>
          ))}
        </div>
        {periods.map((period) => (
          <div key={period.label} className="grid grid-cols-8 gap-1">
            <div className="flex items-center text-[10px] text-zinc-500">{period.label}</div>
            {days.map((day) => {
              const count = heatmapData[day][period.label];
              const intensity = maxCount > 0 ? count / maxCount : 0;
              return (
                <div
                  key={`${day}-${period.label}`}
                  className={`group relative aspect-[16/4] rounded transition-all hover:scale-110 ${getIntensityColor(intensity)}`}
                  title={`${day} ${period.label}: ${count} events`}
                >
                  {count > 0 && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity
                        group-hover:opacity-100"
                    >
                      <span className="text-[8px] font-semibold text-zinc-300">{count}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border-t border-zinc-700/30 pt-2">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-500">Less</span>
          <div className="h-2 w-2 rounded-sm bg-zinc-800/30" />
          <div className="h-2 w-2 rounded-sm bg-emerald-900/50" />
          <div className="h-2 w-2 rounded-sm bg-emerald-700/60" />
          <div className="h-2 w-2 rounded-sm bg-emerald-500/70" />
          <div className="h-2 w-2 rounded-sm bg-emerald-400" />
          <span className="text-[10px] text-zinc-500">More</span>
        </div>
      </div>
    </div>
  );
}

export default ActivityHeatmap;
