const Transformer = require('../models/Transformer');
const Sensor = require('../models/Sensor');

const getSensors = async (req, res) => {
  try {
      const { page = 1, limit = 10, sort = 'asc' } = req.query; // Default values for page, limit, and sort

      // Convert page and limit to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      // Calculate the number of documents to skip
      const skip = (pageNumber - 1) * limitNumber;

      const transformerId = req.params.id;

      // Fetch the transformers with pagination and sorting
      const sensors = await Sensor.find({ transformerId: transformerId })
          .sort({ date: sort === 'asc' ? 1 : -1 })
          .skip(skip)
          .limit(limitNumber);

      // Check if there are any transformers
      if (sensors.length === 0) {
          return res.status(404).json({ message: 'No sensor data found' });
      }

      res.status(200).json(sensors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {  
    getSensors,
};
