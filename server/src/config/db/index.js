const mongoose = require('mongoose');

require('dotenv').config();

const localDatabase = 'mongodb://127.0.0.1:27017/realtime_chat';
const uri = localDatabase || process.env.ATLAS_URI;

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failed:', error.message);
    }
}

module.exports = { connect };
