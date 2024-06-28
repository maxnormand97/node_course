// NOTE: to set up monogoose on local env see the following...
// https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install-mdb-community-macos
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017';
mongoose.connect(uri);
