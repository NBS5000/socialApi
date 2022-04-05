const usernames = [
  'bobaFett',
  'lordVader',
  'chosenOne',
  'obi1',
  'obi2',
  'palp66',
  'littleAni',
  'reyRey',
  'finnnn',
  'c3-po',
  'artoo',
  'chopper',
  'beeBee',
  'letTheWookieWin',
  'lando',
  'jadesFire',
  'xizor',
  'knightsOfMe',
  'tarko',
  'mith-raw',
  'assassin88',
  'mando',
  'justGrogu',
  'snips',
  'theDooks',
  'yoda-I-am',
];

const appDescriptions = [
  'Decision Tracker',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Notes',
  'Messages',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${usernames}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomAssignments };
