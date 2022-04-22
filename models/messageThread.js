const {model, Schema} = require('mongoose');

const messageThreadSchema = new Schema({
    userOne: {
        type: String,
        required: true
    },
    userTwo: {
        type: String,
        required: true
    },
    messages: [
        {
            type: String,
            required: false
        }
    ]
})

const MessageThread = model('MessageThread', messageThreadSchema);

module.exports = MessageThread;