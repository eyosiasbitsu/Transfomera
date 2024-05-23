
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
