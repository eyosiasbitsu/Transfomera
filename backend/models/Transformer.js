
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const transformerSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  sensorId: { 
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
  serialNumber: {
    type: String,
    required: true,
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
  ]
});

module.exports = mongoose.model('Transformer', transformerSchema);
