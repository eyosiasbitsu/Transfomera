// Transformer.js
const mongoose = require('mongoose');

// The properties are to change based on the UI and schema
const transformerSchema = new mongoose.Schema({
  city : { 
    type: String, 
    required: true
  },
  streetAdress : { 
    type: String, 
    required: true
  },
  censorId : { 
    type: String, 
    required: true 
  }, // we get it from req.body
  location: {
    type: { type: String },
    coordinates: []
  }, // we get it from req.body
  healthPercentile: { 
    type: Number, 
    required: true 
  }, // we don't receive when being registered because we get this data from influxDB and the ML model
  installationDate : {
    type:Date
  }, // The day the tranformer
  assignedTechnician : { 
    type: Object 
  },
  registeredBy : { 
    type : Object, 
    required: true
  },
});

transformerSchema.index({ location: '2dsphere' }); // Enable geospatial indexing

module.exports = mongoose.model('Transformer', transformerSchema);