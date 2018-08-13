require('dotenv').config()

//DEPENDENCIES
const mongoose = require('mongoose');

const options = {
  autoIndex: false,
  useNewUrlParser: true
}

switch (process.env.NODE_ENV) {
    case 'dev':
        mongoose.connect("mongodb://localhost:27017/TDDE_DEV", options)
        .then(res=>{})
        .catch(err=>console.log(err))
        break;
    case 'test':
        mongoose.connect("mongodb://localhost:27017/TDDE_TEST", options)
        .then(res=>{})
        .catch(err=>console.log(err))
        break;
    case 'prod':
        mongoose.connect(process.env.MLAB_URL, options)
        .then(res=>{})
        .catch(err=>console.log(err))
        break;
}

module.exports = mongoose;
