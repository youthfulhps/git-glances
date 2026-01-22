import React, { useState } from 'react';
import { Code } from '@carbon/icons-react';
import { LanguageWithRepos } from '@shared/apis/language/types';
import EmptyState from '@shared/components/EmptyState';
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
      <EmptyState
        title="No languages found"
        description="Start coding in your repositories to see language statistics."
        icon={<Code size={32} />}
      />
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
