require('dotenv').config();
const { connectDB } = require('./src/config/db');

const PORT = 3000;
const express = require('express');
const app = express();

connectDB();

app.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
});
