import React from 'react';
import { UserEvent } from '@shared/apis/user/types';
import {
  FlameIcon,
  ClockIcon,
  MessageSquareIcon,
  CalendarIcon,
  ActivityIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  TrendingUpIcon,
} from 'lucide-react';

type FunFactsProps = {
  events: UserEvent[];
};

type Fact = {
  icon: JSX.Element;
  label: string;
  value: string;
  color: string;
};

function FunFacts({ events }: FunFactsProps) {
  const calculateFacts = (): Fact[] => {
    if (events.length === 0) {
      return [];
    }

    // Calculate longest streak
    const eventDates = events
      .map((e) => new Date(e.created_at).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort();

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < eventDates.length; i++) {
      const prevDate = new Date(eventDates[i - 1]);
      const currDate = new Date(eventDates[i]);
      const diffDays = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    // Calculate most productive hour
    const hourCounts: Record<number, number> = {};
    events.forEach((event) => {
      const hour = new Date(event.created_at).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const mostProductiveHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const formattedHour = mostProductiveHour
      ? `${parseInt(mostProductiveHour) % 12 || 12}${parseInt(mostProductiveHour) >= 12 ? 'pm' : 'am'}`
      : 'N/A';

    // Calculate active days
    const activeDays = eventDates.length;

    // Calculate weekend activity percentage
    let weekendEvents = 0;
    events.forEach((event) => {
      const dayOfWeek = new Date(event.created_at).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendEvents++;
      }
    });

    const weekendPercentage = ((weekendEvents / events.length) * 100).toFixed(0);

    // Count unique repositories
    const uniqueRepos = new Set(events.map((e) => e.repo.name)).size;
    const mostActiveRepo =
      Object.entries(
        events.reduce(
          (acc, e) => {
            acc[e.repo.name] = (acc[e.repo.name] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    // Shorten repo name if too long
    const displayRepoName =
      mostActiveRepo !== 'N/A' && mostActiveRepo.length > 20
        ? mostActiveRepo.split('/')[1] || mostActiveRepo.substring(0, 20)
        : mostActiveRepo;

    // Count specific event types
    const totalPRs = events.filter((e) => e.type === 'PullRequestEvent').length;
    const totalCommits = events.filter((e) => e.type === 'PushEvent').length;

    // Calculate average events per day
    const avgEventsPerDay = activeDays > 0 ? (events.length / activeDays).toFixed(1) : '0';

    return [
      {
        icon: <FlameIcon size={14} />,
        label: 'Longest Streak',
        value: `${longestStreak} ${longestStreak === 1 ? 'day' : 'days'}`,
        color: 'text-zinc-400',
      },
      {
        icon: <ClockIcon size={14} />,
        label: 'Peak Hour',
        value: formattedHour,
        color: 'text-zinc-400',
      },
      {
        icon: <MessageSquareIcon size={14} />,
        label: 'Active Days',
        value: `${activeDays} ${activeDays === 1 ? 'day' : 'days'}`,
        color: 'text-zinc-400',
      },
      {
        icon: <CalendarIcon size={14} />,
        label: 'Weekend Coding',
        value: `${weekendPercentage}%`,
        color: 'text-zinc-400',
      },
      {
        icon: <GitBranchIcon size={14} />,
        label: 'Active Repos',
        value: uniqueRepos.toString(),
        color: 'text-zinc-400',
      },
      {
        icon: <ActivityIcon size={14} />,
        label: 'Most Active',
        value: displayRepoName,
        color: 'text-zinc-400',
      },
      {
        icon: <GitPullRequestIcon size={14} />,
        label: 'Pull Requests',
        value: totalPRs.toString(),
        color: 'text-zinc-400',
      },
      {
        icon: <TrendingUpIcon size={14} />,
        label: 'Avg Daily Events',
        value: avgEventsPerDay,
        color: 'text-zinc-400',
      },
    ];
  };

  const facts = calculateFacts();

  if (facts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 p-6">
        <p className="text-sm text-zinc-500">No activity data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/30 p-3">
      <span className="text-xs font-medium text-zinc-300">Fun Facts</span>

      <div className="grid grid-cols-4 gap-2">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-2"
          >
            <div className="flex items-center gap-1.5">
              <div className={fact.color}>{fact.icon}</div>
              <span className="text-[10px] text-zinc-500">{fact.label}</span>
            </div>
            <span className="text-sm text-zinc-200">{fact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FunFacts;
