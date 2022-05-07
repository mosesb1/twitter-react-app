const MessageThread = require('../../models/messageThread');
const Message = require('../../models/message');

const get = (req,res) => {
    MessageThread.find({$or: [{userOne: req.params.userId}, {userTwo: req.params.userId}]}, (err, foundMessageThreads) => {
        if(err) {
            res.status(400).json(err); 
        } else {
            res.status(200).json(foundMessageThreads);
        }
    })
}

const getThread = (req,res) => {
    MessageThread.findById(req.params.threadId, (err, foundThread) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(foundThread);
        }
    })
}

const remove = (req,res) => {
    MessageThread.findByIdAndDelete(req.params.id, (err, deletedThread) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(deletedThread);
        }
    })
}

const create = (req,res) => {
    MessageThread.create({userOne: req.params.firstId, userTwo: req.params.secondId}, (err, createdThread) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(createdThread);
        }
    })
}

const addMessage = (req,res) => {
    Message.findById(req.params.messageId, (err, foundMessage) => {
        if(err){
            res.status(400).json(err);
        } else {
            MessageThread.findByIdAndUpdate(req.params.threadId, {
                $addToSet: {messages: foundMessage}
            }, {returnDocument: 'after'}, (err, updatedThread) => {
                if(err){
                    res.status(400).json(err);
                } else {
                    res.status(200).json(updatedThread);
                }
            })
        }
    })
}

const show = (req,res) => {
    MessageThread.find({$or: [{userOne: req.params.firstId, userTwo: req.params.secondId}, {userOne: req.params.secondId, userTwo: req.params.firstId}]}, (err, foundMessageThreads) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(foundMessageThreads)
        }
    })
}

const deleteAll = (req,res) => {
    MessageThread.deleteMany({}, (err, deletedThreads) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(deletedThreads);
        }
    })
}

module.exports = {
    get,
    getThread,
    remove,
    create,
    addMessage,
    show,
    deleteAll
}