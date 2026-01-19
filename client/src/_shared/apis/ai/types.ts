export type SummarizeResponse = {
  summary: string;
  tags: string[];
};

export type SummarizeRepository = (
  repositoryName: string,
  description: string | null,
) => Promise<{ data: SummarizeResponse }>;

export type ContributionInsightResponse = {
  insight: string;
  tags: string[];
};

export type GenerateContributionInsight = (params: {
  totalCommits: number;
  totalPRs: number;
  totalReviews: number;
  totalIssues: number;
  period: string;
}) => Promise<{ data: ContributionInsightResponse }>;

export type CodeReviewResponse = {
  review: string;
  findings: Array<{
    type: 'bug' | 'security' | 'performance' | 'style' | 'improvement';
    severity: 'high' | 'medium' | 'low';
    message: string;
  }>;
  summary: string;
};

export type GenerateCodeReview = (params: {
  diff: string;
  commitMessage?: string;
  prTitle?: string;
}) => Promise<{ data: CodeReviewResponse }>;

export type LanguageInsightResponse = {
  insight: string;
  tags: string[];
};

export type GenerateLanguageInsight = (params: {
  languages: Array<{
    name: string;
    percentage: number;
    repoCount: number;
    totalSize: number;
  }>;
  totalRepos: number;
  topLanguage: string;
}) => Promise<{ data: LanguageInsightResponse }>;
