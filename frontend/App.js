import './style.scss';
import React, {useEffect, useRef, useState} from 'react';
import Draggable from 'react-draggable';

export function App() {
  const [cnt, setCnt] = React.useState(0);
  const ref = React.useRef(null);

  const updateRegion = (dragging = false) => {
    console.info('updateRegion()', dragging);
    let region = {x: 0, y: 0, width: 0, height: 0};

    if (dragging) {
      region = {x: 0, y: 0, width: 1920, height: 1080};
    }

    if (!dragging && ref.current) {
      console.info(ref.current, ref.current.getBoundingClientRect);
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      console.info(top, left, width, height);
      region = {x: left, y: top, width, height};
    }

    console.info('Region:', region);

    PalmSystem.setInputRegion([region]);
  };

  const onStart = () => {
  };

  const onStop = (ev, pos) => {
    console.info(pos);
    PalmSystem.setInputRegion([{ x: pos.x, y: pos.y, width: 200, height: 200 }]);
  };

  useEffect(() => {
    updateRegion();
  }, [ref]);

  return <Draggable onStart={() => updateRegion(true)} onStop={() => updateRegion(false)}>
    <div className="box" ref={ref}>
      <button onClick={() => setCnt(cnt => cnt+1)}>Button 1</button>
      {cnt}
    </div>
  </Draggable>
}
