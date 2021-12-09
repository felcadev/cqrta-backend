require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());

dbConnection();


app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Todo ok"
    })
});


app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})