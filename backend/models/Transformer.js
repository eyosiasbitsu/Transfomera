// Transformer.js
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const transformerSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  streetAddress: { // Corrected the spelling of 'streetAddress'
    type: String,
    required: true
  },
  sensorId: { // Assuming 'censorId' is correct, though it might be meant to be 'sensorId'
    type: String,
    required: true
  },
  healthPercentile: {
    type: Number,
  },
  installationDate: {
    type: Date
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  registeredBy: {
    type: ObjectId,
    required: true
  },

  sensorData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor'
    }
  ] // Define sensorData as an array of sensorDataSchema
});

module.exports = mongoose.model('Transformer', transformerSchema);
