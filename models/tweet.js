const {model, Schema} = require('mongoose');

const tweetSchema = new Schema({
    content: {
        type: String,
        required
    },
    username: {
        type: String,
        required
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
    ]
})

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;