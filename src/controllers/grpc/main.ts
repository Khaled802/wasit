const protoLoader = require('@grpc/proto-loader');
import path from "path";
const grpc = require('@grpc/grpc-js');




let productsStub: any = null;

export const getProductSub = async () => {
  console.log(productsStub)
  if (productsStub) return productsStub;
  
  const packageDefinitionReci = protoLoader.loadSync(path.join(__dirname, "../../../protos/products.proto"))
  const recipesProto = grpc.loadPackageDefinition(packageDefinitionReci);
  const cls = recipesProto.Products;
  return productsStub = new cls(
    "0.0.0.0:50051",
    grpc.credentials.createInsecure()
  );
}

export const removeSub = async () => {
  productsStub = null;
}
