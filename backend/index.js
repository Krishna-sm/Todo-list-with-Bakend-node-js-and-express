require('colors')
require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

// middlwares
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1',require('./routes/todoRoute'));
app.listen(port,()=>{
    console.log(`the server is Listen at the http://localhost:${port}`)
})