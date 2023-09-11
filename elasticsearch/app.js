const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../protos/products.proto")
);
const { findProduct } = require("./controllers");
const { setupElasticSearch } = require("./helpers/setups");
const { deleteAllDocsOfIndex } = require('./es')

const productsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(productsProto.Products.service, { find: findProduct });
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  async () => {
    await deleteAllDocsOfIndex('products');
    await setupElasticSearch();
    console.log("es started succesfully");
    server.start();
    console.log("grpc running at 0.0.0.0:50051");
  }
);
