const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  company: {
    type: String,
    maxlength: 50,
    required: true
  },
  address: {
    type: String,
    maxlength: 100
  },
  phone: {
    type: Number,
    maxlength: 11
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true
  }
})

module.exports = { UserSchema: model('User', UserSchema) }
