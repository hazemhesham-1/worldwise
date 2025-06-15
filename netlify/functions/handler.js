import { MongoClient } from "mongodb";

let cachedDb = null;

async function connectToDatabase(uri) {
    if(cachedDb) return cachedDb;

    const client = new MongoClient(uri);
    await client.connect();

    cachedDb = client.db("worldwise");

    return cachedDb;
};

async function createCity(cityData) {
    const { id, cityName, country, imgURL, date, notes, position } = cityData;
    if(!cityName || !country) {
        const result = {
            statusCode: 400,
            body: "Missing required fields",
        };

        return result;
    }

    const newCity = { id, cityName, country, imgURL, date, notes, position };
    const createdCity = await db.collection("cities").insertOne(newCity);

    const result = {
        statusCode: 200,
        body: JSON.stringify(createdCity),
    };

    return result;
}

async function getCityById(cityId) {
    try {
        const city = await db.collection("cities").findOne({ id: cityId });
        if(!city) {
            throw new Error("City not found");
        }

        const result = {
            statusCode: 200,
            body: JSON.stringify(city),
        };
    
        return result;
    }
    catch(err) {
        const result = {
            statusCode: 404,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
}

async function deleteCityById(cityId) {
    try {
        const { deletedCount } = await db.collection("cities").deleteOne({ id: cityId });
        if(deletedCount === 0) {
            throw new Error("City not found");
        }

        const result = {
            statusCode: 200,
            body: JSON.stringify({ id: cityId }),
        };

        return result;
    }
    catch(err) {
        const result = {
            statusCode: 404,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
};

export async function handler(event) {
    const method = event.httpMethod;
    const segments = event.path.split("/").filter(Boolean);

    try {
        const db = await connectToDatabase(process.env.MONGODB_URI);

        if(segments.length === 2) {
            if(method === "GET") {
                const cities = await db.collection("cities").find().toArray();
                const result = {
                    statusCode: 200,
                    body: JSON.stringify(cities),
                };

                return result;
            }
            else if(method === "POST") {
                const newCity = JSON.parse(event.body);
                const result = await createCity(newCity);

                return result;
            }
        }
        else if(segments.length > 2) {
            const cityId = segments.pop();

            if(method === "GET") {
                const result = await getCityById(cityId);
                return result;
            }
            if(method === "DELETE") {
                const result = await deleteCityById(cityId);
                return result;
            }
        }
    }
    catch(err) {
        const result = {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
};