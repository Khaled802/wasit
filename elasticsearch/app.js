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
const { findProduct } = require("./controllers");
const { setupElasticSearch } = require("./helpers/setups");

const productsProto = grpc.loadPackageDefinition(packageDefinition);

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
