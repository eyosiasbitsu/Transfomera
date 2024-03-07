const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config();

const client = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
});

const influxDB = client.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET);

module.exports = influxDB;
