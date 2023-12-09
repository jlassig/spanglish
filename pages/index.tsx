import React from 'react';
import MemoryGame from '../components/MemoryGame';
import { findAll } from '../services/WordService'; 
import { WithId } from 'mongodb';

interface Word {
  _id: string;
  english: string;
  spanish: string;
}

interface HomeProps {
  isConnected: boolean;
  words: WithId<Word>[];
}

const Home: React.FC<HomeProps> = ({ isConnected, words }) => {
  return (
    <div className="container">
      <div>
        <h2>Words from MongoDB:</h2>
        <MemoryGame wordList={words} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const words = await findAll<Word>();
    return {
      props: { isConnected: true, words },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, words: [] as WithId<Word>[] },
    };
  }
};

export default Home;

