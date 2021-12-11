require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

dbConnection();


app.use('/api/users', require('./routes/users'));
app.use('/api/shops', require('./routes/shops'));
app.use('/api/files', require('./routes/files'));
app.use('/api/searches', require('./routes/searches'));
app.use('/api/login', require('./routes/auth'));


app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Todo ok"
    })
});


app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})