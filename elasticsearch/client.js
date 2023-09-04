const { Client } = require('@elastic/elasticsearch');

module.exports.client = new Client({node: 'http://localhost:9200' });