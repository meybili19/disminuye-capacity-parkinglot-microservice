const express = require('express');
const { checkParkingLotExists, checkParkingLotCapacity, decreaseParkingLotCapacity } = require('../services/capacityService');

const router = express.Router();

router.put('/decrease/:parkingLotId', async (req, res) => {
    try {
        const { parkingLotId } = req.params;

        const exists = await checkParkingLotExists(parkingLotId);
        if (!exists) {
            return res.status(404).json({ message: 'Parking lot not found or service unavailable' });
        }

        const hasCapacity = await checkParkingLotCapacity(parkingLotId);
        if (!hasCapacity) {
            return res.status(400).json({ message: 'No available capacity' });
        }

        const success = await decreaseParkingLotCapacity(parkingLotId);
        if (!success) {
            return res.status(500).json({ message: 'Failed to update parking lot capacity' });
        }

        res.status(200).json({ message: 'Capacity updated successfully' });
    } catch (error) {
        console.error('🚨 Error in /decrease/:parkingLotId route:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
