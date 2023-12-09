


import React, { FC, useEffect, useState } from 'react';
import Card from './Card';
import { WithId } from 'mongodb';

interface MemoryGameProps {
  wordList: WithId<Word>[]; // Adjusted the type here
}

interface Word {
  _id: string;
  english: string;
  spanish: string;
}

const MemoryGame: FC<MemoryGameProps> = ({ wordList }) => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

  useEffect(() => {
    setFlippedCards(new Array(wordList.length * 2).fill(false));
  }, [wordList]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prevFlippedCards) => {
      const updatedFlippedCards = [...prevFlippedCards];
      updatedFlippedCards[index] = !prevFlippedCards[index];
      return updatedFlippedCards;
    });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {wordList.map(({ _id, english, spanish }, index) => (
        <div key={_id} className="flex">
          <Card
            content={{
              front: flippedCards[index] ? english : '?',
              back: english,
            }}
            isFlipped={flippedCards[index]}
            onClick={() => handleCardClick(index)}
          />
          <Card
            content={{
              front: flippedCards[index + wordList.length] ? spanish : '?',
              back: spanish,
            }}
            isFlipped={flippedCards[index + wordList.length]}
            onClick={() => handleCardClick(index + wordList.length)}
          />
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;








// import React, { FC, useEffect, useState } from 'react';
// import Card from './Card';


// interface MemoryGameProps {
//   wordList: { id: number; english: string; spanish: string }[];
// }

// const MemoryGame: FC<MemoryGameProps> = ({ wordList }) => {
//   const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

//   useEffect(() => {
//     setFlippedCards(new Array(wordList.length * 2).fill(false));
//   }, [wordList]);

//   const handleCardClick = (index: number) => {
//     setFlippedCards((prevFlippedCards) => {
//       const updatedFlippedCards = [...prevFlippedCards];
//       updatedFlippedCards[index] = !prevFlippedCards[index];
//       return updatedFlippedCards;
//     });
//   };

//   return (
//     <div className="flex flex-wrap justify-center">
//       {wordList.map(({ id, english, spanish }, index) => (
//         <div key={id} className="flex">
//           <Card
//             content={{
//               front: flippedCards[index] ? english : '?',
//               back: english,
//             }}
//             isFlipped={flippedCards[index]}
//             onClick={() => handleCardClick(index)}
//           />
//           <Card
//             content={{
//               front: flippedCards[index + wordList.length] ? spanish : '?',
//               back: spanish,
//             }}
//             isFlipped={flippedCards[index + wordList.length]}
//             onClick={() => handleCardClick(index + wordList.length)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MemoryGame;