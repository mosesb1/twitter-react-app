const Message = require('../../models/message');

const get = (req,res) => {
    Message.find({sender: req.params.sender}, (err, foundMessages) => {
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
            res.status(200).json(createdMessage);
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