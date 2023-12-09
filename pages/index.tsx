import React from 'react';
import MemoryGame from '../components/MemoryGame';
import { fetchData } from '../utils/api';
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
  if (!isConnected) {
    return <div>You are NOT connected to MongoDB. Check the README.md for instructions.</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Welcome to Spanglish Match</h1>

      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
        </h2>
      )}

      <div>
        <h2>Words from MongoDB:</h2>
        <MemoryGame wordList={words} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const words = await fetchData<Word>('WordList');
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




















// import Head from 'next/head';
// import clientPromise from '../lib/mongodb';
// import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsResult } from 'next';
// import { Collection, MongoClient, WithId, Document } from 'mongodb';

// type ConnectionStatus = {
//   isConnected: boolean;
//   words?: WithId<Document>[]; // Adjusted the type here
// };

// export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
//   try {
//     const client = await clientPromise;
//     const db = client.db('spanglish');
//     const collection: Collection<WithId<Document>> = db.collection('WordList'); // Adjusted the type here
//     const words = await collection.find().toArray();

//     return {
//       props: { isConnected: true, words },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: { isConnected: false },
//     };
//   }
// };


// export default function Home({
//   isConnected,
//   words,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div className="container">
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="title">
//           Welcome to Spanglish Match
//         </h1>

//         {isConnected ? (
//           <h2 className="subtitle">You are connected to MongoDB</h2>
//         ) : (
//           <h2 className="subtitle">
//             You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
//             for instructions.
//           </h2>
//         )}
//           <div>
//           <h2>Words from MongoDB:</h2>
//           <ul>
//             {words?.map((word) => (
//               <li key={String(word._id)}>{`${word.english} - ${word.spanish}`}</li>
//             ))}
//           </ul>
//         </div>


//         <div className="grid">


    
//         </div>
//       </main>

//       <footer>
        
//       </footer>

      
//    </div>    

        

      

//   )
// }
