const Tweet = require('../../models/tweet');
const User = require('../../models/user');

const get = (req,res) => {
    Tweet.find()
        .populate({
            path: 'replies',
            populate: {
                path: 'replies'
            }
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user'
            }
        })
        .populate('parent')
        .populate('user')
        .exec((err, foundTweets) => {
            if(err){
                res.status(400).json(err)
            } else {
                res.status(200).json(foundTweets)
            }
        })
}

const getReplies = (req,res) => {
    Tweet.findById(req.params.tweetId)
        .populate({
            path: 'replies',
            populate: {
                path: 'replies'
            }
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user'
            }
        })
        .populate('parent')
        .populate('user')
        .exec((err, foundTweets) => {
            if(err){
                res.status(400).json(err)
            } else {
                res.status(200).json(foundTweets)
            }
        })
}

const getUserTweets = (req,res) => {
    Tweet.find({$and: [{user: req.params.userId}, {reply: "false"}]})
        .populate({
            path: 'replies',
            populate: {
                path: 'replies'
            }
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user'
            }
        })
        .populate('parent')
        .populate('user')
        .exec((err, foundTweets) => {
            if(err){
                res.status(400).json(err)
            } else {
                res.status(200).json(foundTweets)
            }
        })
}

const getUserTweetsAndReplies = (req,res) => {
    Tweet.find({user: req.params.userId})
        .populate({
            path: 'replies',
            populate: {
                path: 'replies'
            }
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user'
            }
        })
        .populate('parent')
        .populate('user')
        .exec((err, foundTweets) => {
            if(err){
                res.status(400).json(err)
            } else {
                res.status(200).json(foundTweets)
            }
        })
}

const getLikes = (req,res) => {
    User.findById(req.params.userId, (err, foundUser) => {
        if(err){
            res.status(400).json(err);
        } else {
            Tweet.find({_id: {$in: foundUser.likes}})
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'replies'
                    }
                })
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'user'
                    }
                })
                .populate('parent')
                .populate('user')
                .exec((err, foundTweets) => {
                    if(err){
                        res.status(400).json(err)
                    } else {
                        res.status(200).json(foundTweets)
                    }
                })
        }
    })
}

const getHome = (req,res) => {
    User.findById(req.params.userId, (err, foundUser) => {
        if(err) {
            res.status(400).json(err);
        } else {
            Tweet.find({$or: [{_id: {$in: foundUser.likes}}, {user: {$in: foundUser.following}}, {user: foundUser._id}]})
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'replies'
                    }
                })
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'user'
                    }
                })
                .populate('parent')
                .populate('user')
                .exec((err, foundTweets) => {
                    if(err){
                        res.status(400).json(err)
                    } else {
                        res.status(200).json(foundTweets)
                    }
                })
        }
    })
}

const getBookmark = (req,res) => {
    User.findById(req.params.userId, (err, foundUser) => {
        if(err){
            res.status(400).json(err);
        } else {
            Tweet.find({_id: {$in: foundUser.bookmarks}})
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'replies'
                    }
                })
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'user'
                    }
                })
                .populate('parent')
                .populate('user')
                .exec((err, foundTweets) => {
                    if(err){
                        res.status(400).json(err)
                    } else {
                        res.status(200).json(foundTweets)
                    }
                })
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
    Tweet.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const like = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.tweetId, {$addToSet: {likes: req.params.userId}}, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const removeLike = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.tweetId, {$pull: {likes: req.params.userId}}, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const reply = (req,res) => {
    Tweet.create(req.body, (err, createdTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            Tweet.findByIdAndUpdate(req.params.tweetId, {$addToSet: {replies: createdTweet._id}}, {returnDocument: 'after'}, (err, updatedTweet) => {
                if(err){
                    res.status(400).json(err);
                } else {
                    res.status(200).json(updatedTweet);
                }
            })
        }
    })
}

const removeReply = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.tweetId, {$pull: {replies: req.params.replyId}}, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const bookmark = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.tweetId, {$addToSet: {bookmarks: req.params.userId}}, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
}

const removeBookmark = (req,res) => {
    Tweet.findByIdAndUpdate(req.params.tweetId, {$pull: {bookmarks: req.params.userId}}, {returnDocument: 'after'}, (err, updatedTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(updatedTweet);
        }
    })
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
    Tweet.findById(req.params.id)
        .populate({
            path: 'replies',
            populate: {
                path: 'replies'
            }
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user'
            }
        })
        .populate('parent')
        .populate('user')
        .exec((err, foundTweets) => {
            if(err){
                res.status(400).json(err)
            } else {
                res.status(200).json(foundTweets)
            }
        })
}

const deleteAll = (req,res) => {
    Tweet.deleteMany({}, (err, foundTweet) => {
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(foundTweet);
        }
    })
}

module.exports = {
    get,
    getReplies,
    getUserTweets,
    getUserTweetsAndReplies,
    getLikes,
    getHome,
    getBookmark,
    remove,
    update,
    like,
    removeLike,
    create,
    reply,
    removeReply,
    bookmark,
    removeBookmark,
    show,
    deleteAll
}