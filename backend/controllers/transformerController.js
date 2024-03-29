const Transformer = require('../models/Transformer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getTechnicianTransformers = async (req, res) => {
    try {
      // Get the technician ID from the authenticated user
      const technicianId = req.user._id;
  
      // Query the database for transformers assigned to the technician
      const transformers = await Transformer.find({ technician: technicianId });
  
      // Return the list of transformers
      res.status(200).json({ transformers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch transformers' });
    }
  };

const registerTransformer = async (req, res) => {
    try {
        const { city, streetAddress, censorId, healthPercentile, registeredBy, latitude, longitude } = req.body;

        // Create a new transformer
        const newTransformer = new Transformer({
            city,
            streetAddress,
            censorId,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude] // Assuming longitude comes first
            },
            healthPercentile: null, // Health percentile is not provided during registration
            installationDate: new Date(),
            assignedTechnician: null, // Initially unassigned
            registeredBy
        });

        await newTransformer.save();
        res.status(201).json({ message: 'Transformer registered successfully', transformer: newTransformer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register transformer' });
    }
};

const getTransformerById = async (req, res) => {
    try {
        const transformerId = req.params.id;
        const transformer = await Transformer.findById(transformerId);

        if (!transformer) {
          return res.status(404).json({ message: 'Transformer not found' });
        }

        res.status(200).json({ transformer });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve transformer details' });
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
        console.error(error);
        res.status(500).json({ message: 'Failed to delete transformer' });
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
        console.error(error);
        res.status(500).json({ message: 'Failed to update transformer' });
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
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch transformers' });
    }
};

module.exports = { 
    getTechnicianTransformers, 
    registerTransformer, 
    getTransformerById, 
    deleteTransformerById,
    updateTransformerById,
    getTransformers
};
