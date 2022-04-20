const Tweet = require('../../models/tweet');

const get = (req,res) => {
    Tweet.find({}, (err, foundTweets) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(foundTweets);
        }
    })
}

const remove = (req,res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(deletedTweet);
        }
    })
}
const update = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const like = (req,res) => {
    
}

const create = (req,res) => {
    Tweet.create(req.body, (err, createdTweet) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(createdTweet);
        }
    })
}
const show = (req,res) => {
    Tweet.findById(req.params.id, (err, foundTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(foundTweet);
        }
    })
}

module.exports = {
    get,
    remove,
    update,
    like,
    create,
    show
}