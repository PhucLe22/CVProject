const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        // await mongoose.connect('mongodb+srv://bangtieudaryn1803:<test1234>@cluster0.5ygzaj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('success');
    } catch (error) {
        console.error('fail: ', error.message);
    }
}

module.exports = { connect };
