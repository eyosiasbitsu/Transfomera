const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Transformer = require('./Transformer');

// Define the schema
const sensorDataSchema = new mongoose.Schema({
  temperature: String,
  current: String,
  oilLevel: String,
  date: Date,
  transformerId: {
    type: ObjectId,
    ref: 'Transformer', // Reference to the Transformer model
    required: true
  }
  // How about health percentile?
}); // You may choose to include '_id' depending on whether you want to reference individual sensor data entries.

// Create the model from the schema
const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;