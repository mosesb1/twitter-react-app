const MessageThread = require('../../models/messageThread');

const index = (req,res) => {
    MessageThread.find({}, (err, foundMessageThreads) => {
        if(err) {
            res.status(400).json(err); 
        } else {
            res.status(200).json(foundMessageThreads);
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
    MessageThread.create({userOne: "moses", userTwo: "moses2"}, (err, createdThread) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(createdThread);
        }
    })
}

const addMessage = (req,res) => {
    MessageThread.updateOne({_id: req.params.threadId}, {
        $addToSet: {messages: {
            sender: "moses",
            receiver: "moses2",
            message: "hey bud"
        }}
    });
}

const show = (req,res) => {
    MessageThread.find({$or: [{userOne: req.params.current, userTwo: req.params.other}, {userOne: req.params.other, userTwo: req.params.current}]}, (err, foundMessageThreads) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(foundMessageThreads)
        }
    })
}

module.exports = {
    index,
    remove,
    create,
    addMessage,
    show
}