const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const friendSchema = require('./User');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ]
    },

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

  userSchema
  .virtual('thoughtCount')
  .get(function () {
    return this.thoughts.length;
  });

const User = model('user', userSchema);
const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: 'bobaFett', email: '5_lines@script.com' },
        { username: 'lordVader', email: 'presence@felt.com' },
        { username: 'chosen1', email: 'midichlorian@highest.jedi' },
        { username: 'obi1', email: 'hello.there@ben.com' },
        { username: 'palp66', email: 'fullyOperational@sith.com' },
        { username: 'snips', email:'iAm@noJedi.com' },
        { username: 'theDooks', email:'count@onMe.com' },
        { username: 'yoda-I-am', email:'com@green.little' }
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});



module.exports = User;


