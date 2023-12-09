import { MongoClient, Document, WithId, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DATABASE_NAME = 'spanglish';
const COLLECTION_NAME = 'WordList';

let client: MongoClient;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {});
    await client.connect();
  }

  return client.db(DATABASE_NAME);
};

export const findAll = async <T extends Document>(): Promise<WithId<T>[]> => {
  const database = await connectToDatabase();
  const collection = database.collection<T>(COLLECTION_NAME);
  const data = await collection.find().toArray();

  // Convert ObjectId to string for each document
  const dataWithSerializedIds = data.map((item: { _id: { toHexString: () => any; }; }) => {
    if (item._id instanceof ObjectId) {
      return { ...item, _id: item._id.toHexString() };
    }
    return item;
  });

  return dataWithSerializedIds as WithId<T>[];
};