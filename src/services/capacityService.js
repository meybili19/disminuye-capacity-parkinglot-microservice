const dotenv = require('dotenv');
dotenv.config();

const db = require('../db');
const axios = require('axios');

async function checkParkingLotExists(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.status === 200;
    } catch (error) {
        console.error(`🚨 Error checking if parking lot ${parkingLotId} exists:`, error.message);
        return false;
    }
}

async function checkParkingLotCapacity(parkingLotId) {
    try {
        const response = await axios.get(`${process.env.PARKINGLOT_SERVICE_CAPACITY_URL}/${parkingLotId}`, { timeout: 3000 });
        return response.data.capacity > 0;
    } catch (error) {
        console.error(`🚨 Error checking capacity for parking lot ${parkingLotId}:`, error.message);
        return false;
    }
}

async function decreaseParkingLotCapacity(parkingLotId) {
    try {
        const [rows] = await db.execute(
            'UPDATE ParkingLot SET capacity = capacity - 1 WHERE id = ? AND capacity > 0',
            [parkingLotId]
        );

        if (rows.affectedRows > 0) {
            console.log(`✅ Successfully decreased capacity for parking lot ${parkingLotId}`);
            return true;
        } else {
            console.warn(`⚠️ Parking lot ${parkingLotId} not updated (no available capacity)`);
            return false;
        }
    } catch (error) {
        console.error(`🚨 Error decreasing capacity for parking lot ${parkingLotId}:`, error.message);
        return false;
    }
}

module.exports = { checkParkingLotExists, checkParkingLotCapacity, decreaseParkingLotCapacity };
