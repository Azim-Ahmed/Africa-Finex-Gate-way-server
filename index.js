const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const port = 4000

const uri = "mongodb+srv://AfricaFinex:1234567890@cluster0.02jxk.mongodb.net/stableCoin?retryWrites=true&w=majority";

const app = express()
app.use(bodyParser.json());
app.use(cors())




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const coinCollection = client.db("stableCoin").collection("coinCollection");
    const sellCoinCollection = client.db("stableCoin").collection("sellCoinCollection");



    //sellerdata

    app.post('/buyerdata', (req, res) => {
        const singlebuyerdata = req.body;
        console.log(singlebuyerdata);
        coinCollection.insertOne(singlebuyerdata)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/sellerdata', (req, res) => {
        const singlesellerdata = req.body;
        console.log(singlesellerdata);
        sellCoinCollection.insertOne(singlesellerdata)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })


    console.log("database connected");

});

app.get('/', (req, res) => {
    res.send('Hello !')
})

app.listen(process.env.PORT || port, () => {
    console.log(`we are opened at ${port}`)
})