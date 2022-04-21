const {model, Schema} = require('mongoose');

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Message = model('Message', messageSchema);

module.exports = Message;