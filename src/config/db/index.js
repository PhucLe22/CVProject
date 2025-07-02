const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        await mongoose.connect(
            'mongodb+srv://lenguyenthienphuc2004:76k8v9LqAXDg9tsu@cluster0.yeymzya.mongodb.net/',
        );
        // await mongoose.connect('mongodb+srv://bangtieudaryn1803:test1234>@cluster0.5ygzaj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        // await mongoose.connect('mongodb+srv://tribang:tribang123@clusterresume.rm2tvyc.mongodb.net/CV?retryWrites=true&w=majority&appName=ClusterResume');
        console.log('success');
    } catch (error) {
        console.error('fail: ', error.message);
    }
}

module.exports = { connect };
