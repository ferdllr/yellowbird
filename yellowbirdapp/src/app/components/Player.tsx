import React from 'react';

interface PlayerProps {
}

const Player: React.FC<PlayerProps> = (props) => {
  return (
    <div className="player">
      <img src="PlayerPH.png" alt="" />
    </div>
  );
};

export default Player;
