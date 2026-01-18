export const formatCommitDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const formatSHA = (sha: string, length: number = 7): string => {
  return sha.substring(0, length);
};
