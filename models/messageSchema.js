const {Schema} = require('mongoose');

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'MessageThread',
        required: true
    }
})

module.exports = messageSchema;