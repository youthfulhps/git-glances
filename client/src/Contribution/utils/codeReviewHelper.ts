import { CommitFile, PullRequestFile } from '@shared/apis/contribution/types';

export const generateDiffText = (files: (CommitFile | PullRequestFile)[]): string => {
  return files
    .map((file) => {
      if (!file.patch) return '';
      return `diff --git a/${file.filename} b/${file.filename}\n${file.patch}`;
    })
    .join('\n\n');
};
