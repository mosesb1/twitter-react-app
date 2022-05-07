const {model, Schema} = require('mongoose');

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String,
        required: false
    },
    reply: {
        type: Boolean,
        required: true,
        default: false
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: false,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ],
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
            required: false
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ]
}, {
    timestamps: true
});

const Tweet = model('Tweet', tweetSchema);

module.exports = Tweet;