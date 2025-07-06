const mongoose = require("mongoose");
const User = require("../models/user");
// const dbUrl = 'mongodb://127.0.0.1:27017/wandorLust';
const dbUrl = process.env.ATLAS_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error", err));

const seedAdmin = async () => {
  // await User.deleteOne({ username: 'superadmin' }); // avoid duplicates

  const admin = new User({ 
    username: 'superadmin', 
    email: 'admin@example.com', 
    role: 'superadmin' 
  });

  await User.register(admin, 'admin123'); // ✅ sets salt & hash

  console.log("✅ Superadmin created!");
  mongoose.connection.close();
};

seedAdmin();
