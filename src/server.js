const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const capacityRoutes = require('./routes/capacityRoutes');

dotenv.config();

const app = express();

// Habilitar CORS para permitir cualquier origen
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/capacity', capacityRoutes);

const PORT = process.env.PORT || 7007;
app.listen(PORT, () => {
    console.log(`🚀 Disminuye Capacity server running on port ${PORT}`);
});
