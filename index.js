const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { get } = require('express/lib/response');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3xrww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const bicycleCollection = client.db("cycleHouse").collection("cycles");

        // get all bicycle api
        app.get('/cycles', async (req, res) => {
            const query = {};
            const cursor = bicycleCollection.find(query);
            const resutl = await cursor.toArray();
            res.send(resutl);
        });

        // get one bicycle api
        app.get('/cycles/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const resutl = await bicycleCollection.findOne(query);
            res.send(resutl);

        })

    }
    finally { }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Bicycle Warehouse Server Ready...')
});

app.listen(port, () => {
    console.log('Server ready....')
})