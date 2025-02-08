const express = require("express");
const dotenv = require("dotenv");
const capacityRoutes = require("./routes/capacityRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use(capacityRoutes);

const PORT = process.env.PORT || 6006;
app.listen(PORT, () => {
    console.log(`Decrease Capacity Microservice running on port ${PORT}`);
});
