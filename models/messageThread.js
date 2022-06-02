const {model, Schema} = require('mongoose');

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
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

const MessageThread = model('MessageThread', messageThreadSchema);

module.exports = MessageThread;