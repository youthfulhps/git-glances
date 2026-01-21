import { ContributionsCollection } from '@shared/apis/contribution';

const getContributionLevel = (count: number) => {
  if (count === 0) return 'NONE';
  if (count <= 3) return 'FIRST_QUARTILE';
  if (count <= 6) return 'SECOND_QUARTILE';
  if (count <= 9) return 'THIRD_QUARTILE';
  return 'FOURTH_QUARTILE';
};

// Generate mock contribution data
const generateMockContributions = (): ContributionsCollection => {
  const weeks = [];
  const today = new Date();

  // Generate 26 weeks (6 months)
  for (let w = 0; w < 26; w++) {
    const contributionDays = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (25 - w) * 7 - (6 - d));
      const count = Math.floor(Math.random() * 15);
      contributionDays.push({
        contributionCount: count,
        date: date.toISOString().split('T')[0],
        contributionLevel: getContributionLevel(count),
      });
    }
    weeks.push({ contributionDays });
  }

  return {
    totalIssueContributions: 42,
    totalCommitContributions: 328,
    totalPullRequestContributions: 67,
    totalPullRequestReviewContributions: 93,
    restrictedContributionsCount: 0,
    contributionCalendar: {
      totalContributions: 530,
      weeks,
    },
  };
};

export const mockContributions = generateMockContributions();
