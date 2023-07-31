import React from 'react';

export const getPositionsFromEvent = (event: React.PointerEvent) => {
  const { clientX, clientY } = event;

  // Credit for scrollLeft/scrollTop: https://github.com/react-grid-layout/react-draggable/blob/master/lib/utils/domFns.js
  const x = clientX + document.body.scrollLeft;
  const y = clientY + document.body.scrollTop;

  return { x, y };
};
