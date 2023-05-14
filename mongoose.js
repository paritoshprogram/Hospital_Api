const mongoose = require('mongoose');



//const DB = 'mongodb+srv://paritosh741:Liverpool7@cluster0.harxzr5.mongodb.net/hospital?retryWrites=true&w=majority'

const DB = 'mongodb://127.0.0.1/hospital';

mongoose.connect(DB,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connection Successful')
}).catch((err)=>{
    console.log('Connection Failed')
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

//db.createUser({user: "paritosh741", pwd: "Liverpool7", roles:[{role:"root",db:"admin"}]})

module.exports = db;