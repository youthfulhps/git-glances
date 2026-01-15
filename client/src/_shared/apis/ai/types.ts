export type SummarizeResponse = {
  summary: string;
  tags: string[];
};

export type SummarizeRepository = (
  repositoryName: string,
  description: string | null,
) => Promise<{ data: SummarizeResponse }>;
