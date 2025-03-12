import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('❌ Missing MONGODB_URI in .env.local');
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {}; // No need for deprecated options

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Extend the globalThis type to include _mongoClientPromise
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch(err => {
      console.error("❌ MongoDB Connection Error:", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  });
}

export default clientPromise;
