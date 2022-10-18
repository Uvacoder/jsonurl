const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@jsonurl.bdigtqz.mongodb.net/?retryWrites=true&w=majority`;

export const insertRecord = async () => {
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    const db = client.db('test');

    await db.collection('users').insertOne({
        name: 'user',
        age: 24,
    });

    client.close();
};
