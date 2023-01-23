import React from 'react';
import FeatureSection from '@layout/components/FeatureSection';
import useTrendsRepoListQuery from '../queries/useTrendsRepoListQuery';
import TrendsRepoList from './TrendsRepoList';

function Trends() {
  const trendsRepoList = useTrendsRepoListQuery();

  return (
    <FeatureSection summary={trendsRepoList[0].name} gridArea="Trends">
      <TrendsRepoList trendsRepoList={trendsRepoList} />
    </FeatureSection>
  );
}

export default Trends;
