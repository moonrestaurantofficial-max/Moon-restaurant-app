import { MongoClient, type Db, type ObjectId } from 'mongodb';

export interface ReviewDoc {
  _id?: ObjectId;
  name: string;
  phone: string | null;
  rating: number;
  branch: string;
  comment: string;
  isPublished: boolean;
  createdAt: string;
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'moon_restaurant';

export const isMongoConfigured = Boolean(uri);

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (clientPromise) return clientPromise;

  // Reuse the client across hot reloads in dev so we don't exhaust connections.
  const globalWithMongo = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };

  if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
