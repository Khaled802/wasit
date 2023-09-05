const protoLoader = require('@grpc/proto-loader');
import path from "path";
const grpc = require('@grpc/grpc-js');

const packageDefinitionReci = protoLoader.loadSync(path.join(__dirname, "../../../protos/products.proto"))
const recipesProto = grpc.loadPackageDefinition(packageDefinitionReci);



const cls = recipesProto.Products;
export const productsStub = new cls(
    "0.0.0.0:50051",
    grpc.credentials.createInsecure()
  );