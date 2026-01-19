import { RepositoryNode, LanguageWithRepos } from '@shared/apis/language/types';

export const getLanguagesWithRepos = (repositories: RepositoryNode[]): LanguageWithRepos[] => {
  const languageMap = new Map<string, LanguageWithRepos>();

  // Calculate total size first
  let totalSize = 0;
  repositories.forEach((repo) => {
    repo.languages.edges.forEach((edge) => {
      totalSize += edge.size;
    });
  });

  // Build language map
  repositories.forEach((repo) => {
    repo.languages.edges.forEach((edge) => {
      const { name, color } = edge.node;
      const size = edge.size;

      if (!languageMap.has(name)) {
        languageMap.set(name, {
          name,
          color: color || '#858585',
          totalSize: 0,
          percentage: 0,
          repoCount: 0,
          repositories: [],
        });
      }

      const lang = languageMap.get(name)!;
      lang.totalSize += size;

      // Check if this repo is already added
      const existingRepo = lang.repositories.find(r => r.name === repo.name);
      if (!existingRepo) {
        lang.repoCount++;
        lang.repositories.push({
          name: repo.name,
          url: repo.url,
          size: size,
          percentage: 0, // Will calculate later
        });
      } else {
        existingRepo.size += size;
      }
    });
  });

  // Calculate percentages and sort
  const languages = Array.from(languageMap.values());

  languages.forEach((lang) => {
    lang.percentage = totalSize > 0 ? (lang.totalSize / totalSize) * 100 : 0;

    // Sort repositories by size
    lang.repositories.sort((a, b) => b.size - a.size);

    // Calculate repository percentages
    lang.repositories.forEach((repo) => {
      repo.percentage = lang.totalSize > 0 ? (repo.size / lang.totalSize) * 100 : 0;
    });
  });

  // Sort languages by total size
  return languages.sort((a, b) => b.totalSize - a.totalSize);
};

export const formatBytes = (bytes: number): string => {
  if (bytes >= 1000000) {
    return `${(bytes / 1000000).toFixed(1)}M`;
  }
  if (bytes >= 1000) {
    return `${(bytes / 1000).toFixed(1)}K`;
  }
  return bytes.toString();
};

export const getTotalStats = (languages: LanguageWithRepos[]) => {
  const totalSize = languages.reduce((sum, lang) => sum + lang.totalSize, 0);
  const totalLanguages = languages.length;
  const allRepos = new Set<string>();

  languages.forEach((lang) => {
    lang.repositories.forEach((repo) => {
      allRepos.add(repo.name);
    });
  });

  return {
    totalSize,
    totalLanguages,
    totalRepos: allRepos.size,
  };
};

export const filterLanguagesByName = (
  languages: LanguageWithRepos[],
  searchQuery: string
): LanguageWithRepos[] => {
  if (!searchQuery) return languages;

  const query = searchQuery.toLowerCase();
  return languages.filter((lang) =>
    lang.name.toLowerCase().includes(query) ||
    lang.repositories.some((repo) => repo.name.toLowerCase().includes(query))
  );
};

export const sortLanguages = (
  languages: LanguageWithRepos[],
  sortBy: 'usage' | 'repos' | 'name'
): LanguageWithRepos[] => {
  const sorted = [...languages];

  switch (sortBy) {
    case 'usage':
      return sorted.sort((a, b) => b.totalSize - a.totalSize);
    case 'repos':
      return sorted.sort((a, b) => b.repoCount - a.repoCount);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

export const prepareLanguageInsightData = (languages: LanguageWithRepos[]) => {
  const stats = getTotalStats(languages);
  const topLanguages = languages.slice(0, 5);

  return {
    languages: topLanguages.map((lang) => ({
      name: lang.name,
      percentage: lang.percentage,
      repoCount: lang.repoCount,
      totalSize: lang.totalSize,
    })),
    totalRepos: stats.totalRepos,
    topLanguage: languages[0]?.name || '',
  };
};
