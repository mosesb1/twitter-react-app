const Message = require('../../models/message');
const MessageThread = require('../../models/messageThread');

const get = (req,res) => {
    Message.find({thread: req.params.threadId}, (err, foundMessages) => {
        if(err){
            res.status(400).json(err)
        } else {
            res.status(200).json(foundMessages)
        }
    })
}

const create = (req,res) => {
    Message.create(req.body, (err, createdMessage) => {
        if(err) {
            res.status(400).json(err);
        } else {
            MessageThread.findByIdAndUpdate(req.params.threadId, { $addToSet: {messages: createdMessage} }, {returnDocument: 'after'}, (err, updatedThread) => {
                    if(err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json(updatedThread);
                    }
            })
        }
    })
}

const remove = (req,res) => {
    Message.findByIdAndDelete(req.params.id, (err, deletedMessage) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(deletedMessage)
        }
    })
}

module.exports = {
    get,
    create,
    remove
}