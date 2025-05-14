import React, { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import lockIcon from '../assets/lock.json';

const AnimatedIcon = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return <Player ref={playerRef} icon={lockIcon} style={{ width: "150px", height: "150px" }} colors={{ primary: "#ffffff" }}/>;
};

export default AnimatedIcon;
