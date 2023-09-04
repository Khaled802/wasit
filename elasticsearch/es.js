const { body } = require('express-validator');
const { client } = require('./client');


module.exports.make_indexing = async (indexName) => { 
    return await client.indices.create({
        index: indexName
    });
}

module.exports.addMapToIndex = async (indexName, mapping) => {
    return await client.indices.putMapping({
        index: indexName,
        body: mapping
    });
}

module.exports.insertDoc = async (indexName, _id, data) => {
    return await client.index({
        index: indexName,
        id: _id,
        body: data
    })
}


module.exports.basicSearch = async (indexedName, payload) => {
    return await client.search({
        index: indexedName,
        body: payload
    })
}


module.exports.isExistIndex = async (indexName) => {
    return await client.indices.exists({
        index: indexName
      })
}


module.exports.deleteAllDocsOfIndex =  async indexName => {
    return  await client.deleteByQuery({
        index: indexName,
        body: {
          query: {
            match_all: {} // match all documents
          }
        }
    });
}