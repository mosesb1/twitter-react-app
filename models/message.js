const {model} = require('mongoose');
const messageSchema = require('./messageSchema');

const Message = model('Message', messageSchema);

module.exports = Message;