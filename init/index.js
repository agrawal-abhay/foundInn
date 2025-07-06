const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
// const mongoUrl = 'mongodb://127.0.0.1:27017/wandorLust';
const mongoUrl = process.env.ATLAS_URL;

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"67daf4674c3ee7a23c86d13d"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
}

initDB();