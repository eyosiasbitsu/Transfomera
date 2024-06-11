const Transformer = require('../models/Transformer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');
const User = require('../models/User');
const { raw } = require('express');

const addSensorData = async (req, res) => {
    try {
      // Extract sensorId from URL parameters and raw sensor data from the request body
      const sensorId = req.params.id;
      const rawSensorData = req.body;

      // Find the corresponding Transformer and add the ID of the new Sensor data to its sensorData array
      const updatedTransformer = await Transformer.findOne( { sensorId: sensorId } );

      if (!updatedTransformer) {
        return res.status(404).send({ message: "Transformer not found." });
      }

      // Add transformerId to the rawSensorData
      rawSensorData.transformerId = updatedTransformer._id;
      rawSensorData.date = Date.now();
      
      // Create and save the new Sensor data document
      const newSensorData = new Sensor(rawSensorData);
      const savedSensorData = await newSensorData.save();

      updatedTransformer.sensorData.push(savedSensorData.id);
      await updatedTransformer.save(); 
      // Successfully updated the transformer with new sensor data
      res.status(200).json({ message: "Sensor data added successfully.", updatedTransformer });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

const registerTransformer = async (req, res) => {
    try {
        const { city, streetAddress, sensorId, serialNumber, latitude, longitude } = req.body;
        // Ensure that the authMiddleware is called before this function
        // so req.user is populated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. Please login.' });
        }
        console.log(req.user._id);
        // Create a new transformer
        const newTransformer = new Transformer({
            city,
            streetAddress,
            latitude,
            longitude,
            sensorId,
            serialNumber,
            healthPercentile: null, // Health percentile is not provided during registration
            installationDate: new Date(),
            assignedTechnician: null, // Initially unassigned
            registeredBy: req.user._id, // Use the _id of the logged-in user
        });

        await newTransformer.save();
        res.status(201).json({ message: 'Transformer registered successfully'});
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

const getTransformerById = async (req, res) => {
    try {
        const id = req.params.id;
        const transformer = await Transformer.findById(id);

        if (!transformer) {
          return res.status(404).json({ message: 'Transformer not found' });
        }

        res.status(200).json({ transformer });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteTransformerById  = async (req, res) => {
    try {
        const transformerId = req.params.id;
        const transformer = await Transformer.findById(transformerId);
        if (!transformer) {
          return res.status(404).json({ message: 'Transformer not found' });
        }
    
        // Check if the logged-in technician is assigned to this transformer
        if (!req.user || transformer.assignedTechnician._id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'You are not authorized to delete this transformer' });
        }
    
        await Transformer.findByIdAndDelete(transformerId);
        res.status(200).json({ message: 'Transformer deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
 
const updateTransformerById = async (req, res) => {
    try {
        const transformerId = req.params.id;
        const updateParams = req.body;
    
        const transformer = await Transformer.findById(transformerId);
        if (!transformer) {
          return res.status(404).json({ message: 'Transformer not found' });
        }
    
        // Update the transformer with the new data
        for (const key in updateParams) {
          transformer[key] = updateParams[key];
        }
    
        await transformer.save();
        res.status(200).json({ message: 'Transformer updated successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTransformers = async (req, res) => {
  try {
      const { page = 1, limit = 10, sort = 'asc' } = req.query; // Default values for page, limit, and sort

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      // Calculate the number of documents to skip
      const skip = (pageNumber - 1) * limitNumber;

      // Fetch the transformers with pagination and sorting
      const transformers = await Transformer.find()
          .sort({ healthPercentile: sort === 'asc' ? 1 : -1 })
          .skip(skip)
          .limit(limitNumber);

      // Check if there are any transformers
      if (transformers.length === 0) {
          return res.status(404).json({ message: 'No transformers found' });
      }

      res.status(200).json(transformers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {  
    registerTransformer, 
    getTransformerById, 
    deleteTransformerById,
    updateTransformerById,
    getTransformers,
    addSensorData
};
