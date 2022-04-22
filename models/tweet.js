const {model, Schema} = require('mongoose');

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    likes: [
        {
            type: String,
            required: false
        }
    ],
    replies: [
        {
            type: String,
            required: false
        }
    ]
})

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;