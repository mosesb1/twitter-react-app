const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('connected', () => console.log(`connected to ${db.name} at ${db.host}:${db.port}`));

module.exports = mongoose;