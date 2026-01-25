import { useState } from 'react';
import GuideBadge from './GuideBadge';

function Guide() {
  const [isGuideShowing, setIsGuideShowing] = useState(false);

  const handleToogleGuide = () => {
    setIsGuideShowing((prev) => !prev);
  };

  return <GuideBadge onToggle={handleToogleGuide} isGuideShowing={isGuideShowing} />;
}

export default Guide;
