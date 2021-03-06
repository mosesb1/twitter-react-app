const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: "https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/604513-2135246437-1491282148.jpg"
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
            required: false
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
            required: false
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function(next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  });

module.exports = mongoose.model('User', userSchema);