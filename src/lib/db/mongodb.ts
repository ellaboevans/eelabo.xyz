import { MongoClient, Db } from "mongodb";

const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add your MongoDB URI to environment variables");
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalThis._mongoClientPromise = client.connect();
    }
    return globalThis._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || "portfolio");
}

export default getClientPromise;
