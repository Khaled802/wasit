const { client } = require("../client");
const {
  make_indexing,
  addMapToIndex,
  insertDoc,
  isExistIndex,
} = require("../es");
const { productNormalProperties, products } = require("../temp");

module.exports.setupElasticSearch = async () => {
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
};
