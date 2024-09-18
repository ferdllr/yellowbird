import React from 'react';

interface PlayerProps {
}

const LogoIcon: React.FC<PlayerProps> = (props) => {
  return (
    <img src="yellowbird.png" className='main-icon'></img>
  );
};

export default LogoIcon;
