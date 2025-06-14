import { connectToDatabase } from "./data";

export async function handler(event) {
    if(event.httpMethod !== "DELETE") {
        const result = {
            statusCode: 405,
            body: "Method Not Allowed",
        };

        return result;
    }

    try {
        const db = await connectToDatabase(process.env.MONGODB_URI);

        const segments = event.path.split("/").filter(Boolean);
        const cityId = segments.pop();

        const response = await db.collection("cities").deleteOne({ id: cityId });

        if(response.deletedCount === 0) {
            const result = {
                statusCode: 404,
                body: JSON.stringify({ error: "City not found" }),
            };

            return result;
        }

        const result = {
            statusCode: 200,
            body: JSON.stringify({ id: cityId }),
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