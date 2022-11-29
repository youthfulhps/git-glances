import React from 'react';
import Section from '@layout/components/Section';
import useRepoSuggestedMaintenanceQuery from '../queries/useRepoSuggestedMaintenanceQuery';
import RepoSuggestedMaintenance from './RepoSuggestedMaintenance';

function Repository() {
  const { repoSuggestedMaintenance } = useRepoSuggestedMaintenanceQuery();

  return (
    <Section gridArea="repository">
      <RepoSuggestedMaintenance
        repoSuggestedMaintenance={repoSuggestedMaintenance}
      />
    </Section>
  );
}

export default Repository;
