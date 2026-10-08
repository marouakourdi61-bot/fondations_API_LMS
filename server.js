const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");


const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "LMS API is working"
    });
});

app.use("/api/courses", courseRoutes);

app.get("/api/modules/test", (req, res) => {
    res.json({
        message: "modules route works"
    });
});

app.use("/api/modules", resourceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", enrollmentRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
