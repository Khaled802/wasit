// const config = require('config');
// const elasticConfig = config.get('elastic');
const { client } = require("./client");
const { productNormalProperties, products } = require("./temp");
const express = require("express");
const {
    make_indexing,
    addMapToIndex,
    basicSearch,
    insertDoc,
    isExistIndex,
} = require("./es");

const app = express();


app.get('/products', async (req, res) => {
    const text = req.query.text;
    const result = await basicSearch('products', {
        query: {
            match: {
                name: text,
            },
        }
    });
    res.json(result);
})

const start = async () => {
    await client.ping();
    if (!isExistIndex('products')) {
        await make_indexing("products");
    }
   
    await addMapToIndex("products", productNormalProperties);
    for (const product of products) {
        const { name, description } = product;
        await insertDoc("products", product.id.toString(), { name, description });
    
    }
    console.log("started succesfully");
    app.listen(3001, ()=> console.log('service elastic search running on port 3001'));
};

start();
