const { basicSearch } = require('./es');
const grpc = require("@grpc/grpc-js");


module.exports.findProduct = async (call, callback) =>  {
  const q = call.request.q;
  const result = (
      await basicSearch("products", {
          query: {
              multi_match: {
                  query: q,
                  fields: ["name", "description"],
                  fuzziness: 2,
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

  if (result) {
      callback(null, { products: reformat });
  } else {
      callback({
          message: "Recipe not found",
          code: grpc.status.INVALID_ARGUMENT,
      });
  }
}