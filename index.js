require("dotenv").config();
const { connectDB } = require("./src/config/db");

const PORT = 3000;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const userRouter = require("./src/api/routes/user");
const carRouter = require("./src/api/routes/car");
const rentRouter = require("./src/api/routes/rent");
app.use("/user", userRouter);
app.use("/car", carRouter);
app.use("/rent", rentRouter);

app.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});
