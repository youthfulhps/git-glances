export const getFileStatusColor = (status: string): string => {
  return 'text-zinc-500';
};

export const getFileStatusText = (status: string): string => {
  switch (status) {
    case 'added':
      return 'Added';
    case 'removed':
      return 'Removed';
    case 'modified':
      return 'Modified';
    case 'renamed':
      return 'Renamed';
    default:
      return status;
  }
};

export const formatDiffHeader = (filename: string, patch: string): string => {
  return `diff --git a/${filename} b/${filename}
--- a/${filename}
+++ b/${filename}
${patch}`;
};
