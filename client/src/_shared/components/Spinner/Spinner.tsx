import React from 'react';

function Spinner() {
  return (
    <div
      style={{ borderTopColor: 'transparent' }}
      className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-zinc-400"
    />
  );
}

export default Spinner;
