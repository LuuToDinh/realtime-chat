const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3002;

db.connect();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(port, (req, res) => {
    console.log('Server is running at: http://localhost:' + port);
});
