// const config = require('config');
// const elasticConfig = config.get('elastic');
const { client } = require("./client");
const { productNormalProperties, products } = require("./temp");
const express = require("express");
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, "../protos/products.proto")
);
const {
    make_indexing,
    addMapToIndex,
    basicSearch,
    insertDoc,
    isExistIndex,
} = require("./es");
const productsProto = grpc.loadPackageDefinition(packageDefinition);

async function findProduct(call, callback) {
    const q = call.request.q;
    const result = (
        await basicSearch("products", {
            query: {
                match: {
                    name: q,
                },
            },
        })
    ).body.hits.hits;

    const reformat = [];

    for (const rs of result) {
        reformat.push({
            id: Number.parseInt(rs._id),
            name: rs._source.name,
            description: rs._source.description,
        });
    }

    console.log(reformat);

    if (result) {
        callback(null, { products: reformat });
    } else {
        callback({
            message: "Recipe not found",
            code: grpc.status.INVALID_ARGUMENT,
        });
    }
}


const setupElasticSearch = async () => {
    await client.ping();
    if (!isExistIndex("products")) {
        await make_indexing("products");
    }

    await addMapToIndex("products", productNormalProperties);
    for (const product of products) {
        const { name, description } = product;
        await insertDoc("products", product.id.toString(), {
            name,
            description,
        });
    }
}
const server = new grpc.Server();
server.addService(productsProto.Products.service, { find: findProduct });
server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    async () => {
        await setupElasticSearch();
        console.log("es started succesfully");
        server.start();
        console.log("grpc running at 0.0.0.0:50051");
    }
);
