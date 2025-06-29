const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        await mongoose.connect(
            'mongodb+srv://tribang:tribang123@clusterresume.rm2tvyc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterResume',
        );
        console.log('success');
    } catch (error) {
        console.error('fail: ', error.message);
    }
}

module.exports = { connect };
