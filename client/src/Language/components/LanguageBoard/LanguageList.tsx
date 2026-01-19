import React, { useState } from 'react';
import { LanguageWithRepos } from '@shared/apis/language/types';
import LanguageItem from './LanguageItem';

type LanguageListProps = {
  languages: LanguageWithRepos[];
};

function LanguageList({ languages }: LanguageListProps) {
  const [expandedLanguages, setExpandedLanguages] = useState<Set<string>>(new Set());

  const toggleLanguage = (languageName: string) => {
    setExpandedLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(languageName)) {
        next.delete(languageName);
      } else {
        next.add(languageName);
      }
      return next;
    });
  };

  if (languages.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/30 py-12 text-sm text-zinc-500">
        No languages found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium text-zinc-300">
        Language Breakdown ({languages.length})
      </div>
      <div className="flex flex-col gap-2">
        {languages.map((language) => (
          <LanguageItem
            key={language.name}
            language={language}
            isExpanded={expandedLanguages.has(language.name)}
            onToggle={() => toggleLanguage(language.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default LanguageList;
