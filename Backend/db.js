const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://subhamcodes:HelloWorld@cluster0.xzw8zlo.mongodb.net/Game_app?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to DB successfully');

        const fetched_data = await mongoose.connection.db.collection("games");
        const data = await fetched_data.find({}).toArray();

        // console.log(data);
    } catch (err) {
        console.error('Error connecting to DB:', err); // Use the correct error variable name
    }
};

module.exports = mongoDB;