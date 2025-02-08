const { decreaseParkingLotCapacity } = require('../services/capacityService');

function websocketHandler(ws) {
    console.log('Client connected');
    
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.action === 'decrease_capacity') {
            const success = await decreaseParkingLotCapacity(data.parkingLotId);
            ws.send(JSON.stringify({ action: 'capacity_updated', success }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
}

module.exports = websocketHandler;