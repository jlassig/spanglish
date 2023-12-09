import { MongoClient, Document, WithId } from "mongodb";

export const fetchData = async <T extends Document>(collection: string): Promise<WithId<T>[]> => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client = new MongoClient(process.env.MONGODB_URI, {});

  try {
    await client.connect();
    const database = client.db('spanglish');
    const data = await database.collection<T>(collection).find().toArray();
    
    return data;
  } finally {
    await client.close();
  }
};