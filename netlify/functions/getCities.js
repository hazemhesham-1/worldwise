import { connectToDatabase } from "./data";

async function fetchCityById(cityId) {
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

export async function handler(event) {
    if(event.httpMethod !== "GET") {
        const result = {
            statusCode: 405,
            body: "Method Not Allowed",
        };

        return result;
    }

    try {
        const db = await connectToDatabase(process.env.MONGODB_URI);

        const segments = event.path.split("/").filter(Boolean);

        if(segments.length > 2) {
            const cityId = segments.pop();
            const response = await fetchCityById(cityId);

            return response;
        }

        const cities = await db.collection("cities").find().toArray();

        const result = {
            statusCode: 200,
            body: JSON.stringify(cities),
        };

        return result;
    }
    catch(err) {
        const result = {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
};