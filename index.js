require("dotenv").config()
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('DU 7 Collage Running ')
})


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.nlw4swl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        const projectCollection = client.db('portfolioProject').collection('Projects');

        app.get('/projects',async(req,res) =>{
            const result = await projectCollection.find().toArray()
            res.send(result)
        })
        app.get('/projects/:id',async(req,res) =>{
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await projectCollection.findOne(query)
            res.send(result)
        })
        
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('port console is running')
})