import React, { useState, useMemo } from 'react';
import { SuspenseQuery } from '@suspensive/react-query';
import { contributionsQueryOptions } from '../../queries/useContributionsCollectionQuery';
import { getDateTimeAfterDays, getTodayDateTime } from '@shared/utils/date';
import { Mutation } from '@suspensive/react-query';
import { contributionInsightMutationOptions } from '../../mutations';
import ContributionAI from './ContributionAI';
import ContributionStats from './ContributionStats';
import ContributionCommitList from './ContributionCommitList';
import ContributionPRList from './ContributionPRList';
import SuspenseBoundary from '@shared/boundaries/SuspenseBoundary';
import { useBoard } from '@shared/contexts/BoardContext';
import { PERIODS } from '../../constants/periods';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { DatePicker } from '@shared/components/ui/date-picker';

function ContributionBoard() {
  const { selectedContributionDate, openContributionBoard, clearContributionDate } = useBoard();
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[1]); // Default: 30 days
  const [isOpen, setIsOpen] = useState(false);

  const from = getDateTimeAfterDays(-selectedPeriod.days);
  const to = getTodayDateTime();

  // If a date is selected, use that date for filtering
  const dateRange = useMemo(() => {
    if (selectedContributionDate) {
      // Selected date: show that day's contributions
      const selectedDate = new Date(selectedContributionDate);
      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString();
      return { from: startOfDay, to: endOfDay };
    }
    // No date selected: use period selection
    return { from, to };
  }, [selectedContributionDate, from, to]);

  return (
    <div className="flex flex-col gap-3">
      {/* 헤더 + 드롭다운 (Suspense 바깥) */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Contribution Insights</div>
        <div className="flex items-center gap-2">
          {selectedContributionDate ? (
            <DatePicker
              date={new Date(selectedContributionDate)}
              onDateChange={(date) => {
                if (date) {
                  openContributionBoard(date.toISOString());
                } else {
                  clearContributionDate();
                }
              }}
            />
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300">
                {selectedPeriod.label}
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 border-zinc-700 bg-zinc-900">
                {PERIODS.map((period) => (
                  <DropdownMenuItem
                    key={period.days}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer text-xs text-zinc-300 focus:bg-zinc-800 hover:bg-zinc-800"
                  >
                    {period.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* 데이터 영역 (Suspense 안) */}
      <SuspenseBoundary>
        <SuspenseQuery {...contributionsQueryOptions(dateRange.from, dateRange.to)}>
          {({ data }) => {
            const totalCommits = data?.totalCommitContributions ?? 0;
            const totalPRs = data?.totalPullRequestContributions ?? 0;
            const totalReviews = data?.totalPullRequestReviewContributions ?? 0;
            const totalIssues = data?.totalIssueContributions ?? 0;
            const totalPrivate = data?.restrictedContributionsCount ?? 0;

            return (
              <div className="flex flex-col gap-3">
                {/* Stats */}
                <ContributionStats
                  totalCommits={totalCommits}
                  totalPRs={totalPRs}
                  totalReviews={totalReviews}
                  totalIssues={totalIssues}
                  totalPrivate={totalPrivate}
                />

                {/* AI Insight */}
                <Mutation {...contributionInsightMutationOptions()}>
                  {({ mutate, isPending, isError, data: aiData, error }) => (
                    <ContributionAI
                      onGenerate={() =>
                        mutate({
                          totalCommits,
                          totalPRs,
                          totalReviews,
                          totalIssues,
                          period: selectedPeriod.label,
                        })
                      }
                      isPending={isPending}
                      isError={isError}
                      data={aiData}
                      error={error}
                    />
                  )}
                </Mutation>

                {/* Commit List */}
                <ContributionCommitList
                  commitContributionsByRepository={data?.commitContributionsByRepository ?? []}
                  dateRange={dateRange}
                />

                {/* Pull Request List */}
                <ContributionPRList
                  pullRequestContributions={data?.pullRequestContributions?.nodes ?? []}
                />
              </div>
            );
          }}
        </SuspenseQuery>
      </SuspenseBoundary>
    </div>
  );
}

export default ContributionBoard;
