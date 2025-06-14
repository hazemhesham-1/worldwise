import { MongoClient } from "mongodb";

let cachedDb = null;

export async function connectToDatabase(uri) {
    if(cachedDb) return cachedDb;

    const client = new MongoClient(uri);
    await client.connect();

    cachedDb = client.db("worldwise");

    return cachedDb;
};