require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const {makeConnection} = require('./database/connection');
const appRoutes = require('./routes/routes')
const PORT = process.env.PORT || 3000;

makeConnection();

app.use(bodyParser.json());

app.use(express.json());
app.use('/health/v1',appRoutes);

app.get('/',(req,res) =>{
    res.send("Assignment-17")
})

app.listen(PORT, () => {
    console.log(`Server is running for User-Management on port ${PORT}`);
  });
