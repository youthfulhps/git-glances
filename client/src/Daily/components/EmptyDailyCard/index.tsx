import React, { ChangeEventHandler } from 'react';
import Input from '@shared/components/Input';
import RepositoryDetail from '@shared/components/Details/Repository';
import OptionalSection from '@layout/components/OptionalSection';
import { Repository } from '@shared/apis/repo';

type EmptyDailyCardProps = {
  searchInput: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onCancel: () => void;
  onConfirm: () => void;
  dailyRepo: Repository | null;
};

function EmptyDailyCardCard({
  searchInput,
  onChange,
  onCancel,
  onConfirm,
  dailyRepo,
}: EmptyDailyCardProps) {
  return (
    <OptionalSection
      gridArea="Daily"
      hasOverlay={!!dailyRepo}
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      {dailyRepo ? (
        <RepositoryDetail repository={dailyRepo} />
      ) : (
        <Input
          placeholder="Search repository..."
          onChange={onChange}
          value={searchInput}
        />
      )}
    </OptionalSection>
  );
}

export default EmptyDailyCardCard;
