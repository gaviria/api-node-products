import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_CONNECTION || "")
    .then(db => console.log("Db is connected"))
    .catch(err => console.log(err));