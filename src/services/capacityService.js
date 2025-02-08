const dotenv = require('dotenv');
dotenv.config();

const db = require('../db');
const axios = require('axios');

async function checkParkingLotExists(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.status === 200;
    } catch (error) {
        console.error('Error checking parking lot existence:', error);
        return false;
    }
}

async function checkParkingLotCapacity(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_CAPACITY_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.data.capacity > 0;
    } catch (error) {
        console.error('Error checking parking lot capacity:', error);
        return false;
    }
}

async function decreaseParkingLotCapacity(parkingLotId) {
    try {
        const [rows] = await db.execute(
            'UPDATE ParkingLot SET capacity = capacity - 1 WHERE id = ? AND capacity > 0',
            [parkingLotId]
        );
        return rows.affectedRows > 0;
    } catch (error) {
        console.error('Error decreasing capacity:', error);
        return false;
    }
}

module.exports = { checkParkingLotExists, checkParkingLotCapacity, decreaseParkingLotCapacity };

