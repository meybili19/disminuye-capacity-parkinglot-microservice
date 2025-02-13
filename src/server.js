const express = require('express');
const dotenv = require('dotenv');
const capacityRoutes = require('./routes/capacityRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/capacity', capacityRoutes);

const PORT = process.env.PORT || 7007;
app.listen(PORT, () => {
    console.log(`Disminuye Capacity server running on port ${PORT}`);
});
