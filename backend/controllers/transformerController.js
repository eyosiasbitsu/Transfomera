const Transformer = require('../models/Transformer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sensor = require('../models/Sensor');
const User = require('../models/User');

const addSensorData = async (req, res) => {
    console.log(req.params.id);
    try {
      // Extract sensorId from URL parameters and raw sensor data from the request body
      const { sensorId } = req.params;
      const rawSensorData = req.body;

      console.log(sensorId);
      // Create and save the new Sensor data document
      const newSensorData = new Sensor(rawSensorData);
      const savedSensorData = await newSensorData.save();

      // Find the corresponding Transformer and add the ID of the new Sensor data to its sensorData array
      const updatedTransformer = await Transformer.findOne( { sensorId: sensorId } );

      if (!updatedTransformer) {
        return res.status(404).send({ message: "Transformer not found." });
      }

      await updatedTransformer.sensorData.push(savedSensorData._id);
      // Successfully updated the transformer with new sensor data
      res.status(200).json({ message: "Sensor data added successfully.", updatedTransformer });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
}

const registerTransformer = async (req, res) => {
    try {
        const { city, streetAddress, sensorId, latitude, longitude } = req.body;
        // Ensure that the authMiddleware is called before this function
        // so req.user is populated
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. Please login.' });
        }

        // Create a new transformer
        const newTransformer = new Transformer({
            city,
            streetAddress,
            sensorId,
            location: {
                coordinates: [parseFloat(longitude), parseFloat(latitude)] // Assuming longitude comes first
            },
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
        const sensorId = req.params.id;
        const transformer = await Transformer.find( {sensorId : sensorId});

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
    
        // Check if the logged-in technician is assigned to this transformer
        if (!req.user || transformer.assignedTechnician._id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'You are not authorized to update this transformer' });
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
      // Check if there are any transformers
      const transformers = await Transformer.find();
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
