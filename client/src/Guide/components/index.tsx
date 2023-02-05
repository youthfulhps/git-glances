import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import GuideBadge from './GuideBadge';
import { isGuideShowingAtom } from '../atoms';

function Guide() {
  const isGuideShowingValue = useRecoilValue(isGuideShowingAtom);
  const setIsGuideShowingAtom = useSetRecoilState(isGuideShowingAtom);

  const handleToogleGuide = () => {
    setIsGuideShowingAtom((isGuideShowing) => !isGuideShowing);
  };

  return <GuideBadge onToggle={handleToogleGuide} isGuideShowing={isGuideShowingValue} />;
}

export default Guide;
