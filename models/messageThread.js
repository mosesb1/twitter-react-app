const {model, Schema} = require('mongoose');
const messageSchema = require('./messageSchema');

const messageThreadSchema = new Schema({
    userOne: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTwo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [messageSchema]
})

const MessageThread = model('MessageThread', messageThreadSchema);

module.exports = MessageThread;