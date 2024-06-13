const mongoose = require('mongoose')
const password = encodeURIComponent('RG1oUkxSZGd5');
const uri = `mongodb+srv://Cluster90814:${password}@cluster90814.jh7ruul.mongodb.net/task-manager-api?retryWrites=true&w=majority&appName=Cluster90814`
mongoose.connect(uri);
