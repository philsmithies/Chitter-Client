const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tweetSchema  = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: String, 
    required: true
  },
}, { timestamps: true })

// it will pluralise this name in the db so 'blogs'
const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet;