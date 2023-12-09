import React, { FC } from 'react';

interface CardProps {
  content: { front: string; back: string };
  onClick: () => void;
  isFlipped: boolean;
}

const Card: FC<CardProps> = ({ content, onClick, isFlipped }) => {
  return (
    <div
      className={`${
        isFlipped ? 'bg-white' : 'bg-black'
      } w-32 h-32 border-2 border-solid border-black m-2 text-center cursor-pointer`}
      onClick={onClick}
    >
      <p className={`${isFlipped ? 'invisible' : 'visible'}`}>{content.front}</p>
      <p className={`${isFlipped ? 'visible' : 'invisible'}`}>{content.back}</p>
    </div>
  );
};

export default Card;