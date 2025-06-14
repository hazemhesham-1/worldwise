import { connectToDatabase } from "./data";

export async function handler(event) {
    if(event.httpMethod !== "POST") {
        const result = {
            statusCode: 405,
            body: "Method Not Allowed",
        };

        return result;
    }

    const {
        id,
        cityName,
        country,
        imgURL,
        date,
        notes,
        position,
    } = JSON.parse(event.body);

    if(!cityName || !country) {
        const result = {
            statusCode: 400,
            body: "Missing required fields",
        };

        return result;
    }

    try {
        const newCity = { id, cityName, country, imgURL, date, notes, position };

        const db = await connectToDatabase(process.env.MONGODB_URI);
        const createdCity = await db.collection("cities").insertOne(newCity);

        const result = {
            statusCode: 200,
            body: JSON.stringify(createdCity),
        };

        return result;
    }
    catch (err) {
        const result = {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
};