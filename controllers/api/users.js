const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Tweet = require('../../models/tweet');
const Message = require('../../models/message');
const MessageThread = require('../../models/messageThread');

module.exports = {
  create,
  login,
  get,
  like,
  removeLike,
  follow,
  removeFollow,
  bookmark,
  removeBookmark,
  getUser,
  getUserByName,
  deleteUser,
  deleteAll,
  changeUsername,
  changeEmail,
  changePassword,
  updateUserImg
};

function get(req,res) {
  User.find({}, (err, foundUsers) => {
    if(err){
      res.status(400).json(err)
    } else {
      res.status(200).json(foundUsers)
    }
  })
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can serialize a string
    res.status(200).json(token);
  } catch (e) {
    // Probably a dup email
    res.status(400).json({ msg: e.message});
  }
}

async function login(req, res) {
  try {
    // Find the user by their email address
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.status(200).json( createJWT(user) );
  } catch(e) {
    res.status(400).json({ msg: e.message, reason: 'Bad Credentials' });
  }
}

async function changePassword(req,res) {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) throw new Error();

    const match = await bcrypt.compare(req.body.oldPassword, user.password);
    if(!match) throw new Error();
    user.password = req.body.password;
    user.save();
  } catch (err) {
    res.status(400).json({msg: err.message, reason: 'Bad Credentials'})
  }
}

function getUser(req,res) {
  User.findById(req.params.userId, (err, foundUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(foundUser);
    }
  })
}

function getUserByName(req,res) {
  User.find({username: req.params.username}, (err, foundUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(foundUser);
    }
  })
}

function like(req,res) {
  User.findByIdAndUpdate(req.params.userId, {$addToSet: {likes: req.params.tweetId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function removeLike(req,res) {
  User.findByIdAndUpdate(req.params.userId, {$pull: {likes: req.params.tweetId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err) {
      res.status(400).json(err);  
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function follow(req,res){
  User.findByIdAndUpdate(req.params.userId, {$addToSet: {following: req.params.followId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err) {
      res.status(400).json(err);
    } else {
      User.findByIdAndUpdate(req.params.followId, {$addToSet: {followers: req.params.userId}}, {returnDocument: 'after'}, (err, updatedFollow) => {
        if(err){
          res.status(400).json(err);
        } else {
          res.status(200).json({updatedUser: updatedUser, updatedFollow: updatedFollow})
        }
      })
    }
  })
}

function removeFollow(req,res){
  User.findByIdAndUpdate(req.params.userId, {$pull: {following: req.params.followId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err) {
      res.status(400).json(err);
    } else {
      User.findByIdAndUpdate(req.params.followId, {$pull: {followers: req.params.userId}}, {returnDocument: 'after'}, (err, updatedFollow) => {
        if(err){
          res.status(400).json(err);
        } else {
          res.status(200).json({updatedUser: updatedUser, updatedFollow: updatedFollow})
        }
      })
    }
  })
}

function bookmark(req,res){
  User.findByIdAndUpdate(req.params.userId, {$addToSet: {bookmarks: req.params.tweetId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function removeBookmark(req,res){
  User.findByIdAndUpdate(req.params.userId, {$pull: {bookmarks: req.params.tweetId}}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function deleteUser(req,res){
  User.findByIdAndDelete(req.params.userId, (userErr, deletedUser) => {
    if(userErr) {
      res.status(400).json(userErr);
    } else {
      Tweet.deleteMany({user: req.params.userId}, (tweetErr, deletedTweets) => {
        if(tweetErr){
          res.status(400).json(tweetErr);
        } else {
          Message.deleteMany({$or: [{sender: req.params.userId}, {receiver: req.params.userId}]}, (messageErr, deletedMessages) => {
            if(messageErr) {
              res.status(400).json(messageErr); 
            } else {
              MessageThread.deleteMany({$or: [{userOne: req.params.userId}, {userTwo: req.params.userId}]}, (threadErr, deletedThreads) => {
                if(threadErr){
                  res.status(400).json(threadErr);
                } else {
                  res.status(200).json(deletedUser);
                }
              })
            }
          })
        }
      })
    }
  })
}

function deleteAll(req,res){
  User.deleteMany({},(err, deletedUsers) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(deletedUsers);
    }
  })
}

function changeUsername(req,res) {
  User.findByIdAndUpdate(req.params.userId, {username: req.body.username}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function changeEmail(req,res) {
  User.findByIdAndUpdate(req.params.userId, {email: req.body.email}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

function updateUserImg(req,res) {
  User.findByIdAndUpdate(req.params.userId, {avatar: req.body.avatar}, {returnDocument: 'after'}, (err, updatedUser) => {
    if(err){ 
      res.status(400).json(err);
    } else {
      res.status(200).json(updatedUser);
    }
  })
}

/* Helper Functions */

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}