import mongoose from 'mongoose';

//no non null -> !
mongoose.connect(process.env.DATABASE_CONNECTION!)
    .then(db => console.log("Db is connected"))
    .catch(err => console.log(err));