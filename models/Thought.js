const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('Thought', thoughtSchema);

// Thought.find({}).exec((err, collection) => {
//   if (collection.length === 0) {
//     Thought.insertMany(
//       [
//         { username: 'bobaFett', thoughtText: `You're no good to me dead`, },
//         { username: 'lordVader', thoughtText: `Impressive` },
//         { username: 'chosen1', thoughtText: `I got all the midi's!` },
//         { username: 'obi1', thoughtText: `Hello there` },
//         { username: 'palp66', thoughtText: `Strike me down` },
//         { username: 'littleAni', thoughtText: `You've got a boyfriend?` },
//         { username: 'reyRey', thoughtText: `Where are you Daddy?` },
//         { username: 'finnnn', thoughtText: `I'm with the resistance` },
//         { username: 'threepio', thoughtText: `Where is R2?` },
//         { username: 'artoo', thoughtText: `beep boop` },
//         { username: 'chopper', thoughtText: `wooooo` },
//         { username: 'beeBee', thoughtText: `weeee` },
//         { username: 'letTheWookieWin', thoughtText: `grrrrr` },
//         { username: 'landoCharisma', thoughtText: `Everything you've heard about me is true` },
//         { username: 'jadesFire', thoughtText: `It's always nice to meet new people and make new enemies` },
//         { username: 'xizor', thoughtText: `You'll find I'm full of surprises` },
//         { username: 'knightsOfMe', thoughtText: `Shower time, baby` },
//         { username: 'tarko', thoughtText: `Fire when ready` },
//         { username: 'mith-raw', thoughtText: `I'm Not Accepting Surrenders At This Time` },
//         { username: 'assassin88', thoughtText: `Too late` },
//         { username: 'mando', thoughtText: `This is the.....put that down` },
//         { username: 'justGrogu', thoughtText: `I'm no baby` },
//         { username: 'snips', thoughtText: `I am no Jedi` },
//         { username: 'theDooks', thoughtText: `I Would Kill You Both Right Now If I Did Not Have To Drag Your Bodies` },
//         { username: 'yoda-I-am', thoughtText: `That is why you fail` }
//       ],
//       (insertErr) => {
//         if (insertErr) {
//           handleError(insertErr);
//         }
//       }
//     );
//   }
// });

module.exports = Thought;


