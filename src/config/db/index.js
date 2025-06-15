const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('success');
    } catch (error) {
        console.error('fail: ', error.message);
    }
}

module.exports = { connect };
