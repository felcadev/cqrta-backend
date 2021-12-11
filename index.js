require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

dbConnection();


app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v1/shops', require('./routes/v1/shops'));
app.use('/api/v1/files', require('./routes/v1/files'));
app.use('/api/v1/searches', require('./routes/v1/searches'));
app.use('/api/v1/login', require('./routes/v1/auth'));


app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Todo ok"
    })
});


app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})