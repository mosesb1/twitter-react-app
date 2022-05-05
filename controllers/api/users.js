const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  get,
  like,
  removeLike,
  getUser
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

function getUser(req,res) {
  User.findById(req.params.userId, {email: 0}, (err, foundUser) => {
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
/* Helper Functions */

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}