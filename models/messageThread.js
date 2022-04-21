const {model, Schema} = require('mongoose');
const Message = require('./message');
const messageSchema = model('Message').schema;

const messageThreadSchema = new Schema({
    userOne: {
        type: String,
        required: true
    },
    userTwo: {
        type: String,
        required: true
    },
    messages: [messageSchema]
})

const MessageThread = model('MessageThread', messageThreadSchema);

module.exports = MessageThread;