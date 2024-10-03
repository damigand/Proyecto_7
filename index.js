require('dotenv').config();
const { connectDB } = require('./src/config/db');

const PORT = 3000;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const userRouter = require('./src/api/routes/user');
const carRouter = require('./src/api/routes/car');
app.use('/user', userRouter);
app.use('/car', carRouter);

app.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});
