const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');
// const friendSchema = require('./User');

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
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    // friends: [friendSchema],
    // thoughts: [thoughtSchema],
    
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     return this.length.friends;
//   });

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
        { username: 'littleAni', email: 'orphan@slave.com' },
        { username: 'reyRey', email: 'scavenger@jedi.com' },
        { username: 'finnnn', email: 'fn2187@1order.com' },
        { username: 'threepio', email: 'human@cyborg.relations' },
        { username: 'artoo', email: 'beep@boop.weee' },
        { username: 'chopper', email: 'cranky@pants.com' },
        { username: 'beeBee', email: 'eight@ball.com' },
        { username: 'letTheWookieWin', email: 'grrrrr@wrooow.com' },
        { username: 'landoCharisma', email: 'galactic@entrepreneur.com' },
        { username: 'jadesFire', email: 'mara@hand.com' },
        { username: 'xizor', email: 'charm@blacksun.com' },
        { username: 'knightsOfMe', email: 'kylo@ben.com' },
        { username: 'tarko', email: 'grandmoff@stench.com' },
        { username: 'mith-raw', email:'thrawn@chiss.com' },
        { username: 'assassin88', email:'ig@unit.com' },
        { username: 'mando', email:'thisIs@theWay.com' },
        { username: 'justGrogu', email:'the@child.com' },
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


