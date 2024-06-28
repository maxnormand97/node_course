// NOTE: to set up monogoose on local env see the following...
// https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install-mdb-community-macos
const mongoose = require('mongoose')
// how do I call an env var in this file from dev.env?
const uri = 'mongodb://localhost:27017/task-manager-api';
mongoose.connect(process.env.MONGODB_URI || uri);
