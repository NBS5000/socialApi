const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const totalUser = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {

  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          totalUser: await totalUser(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) => {
        if(!user){
          res.status(404).json({ message: 'No user with that id' })
        }else{
          res.json(user)
        }
      }
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and their thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
          return;
        } else{
          return Thought.deleteMany(
            {_id: { $in: user.thoughts } }
          )
        }
      })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        res.json(user); 
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add a friend to friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.body.id } },
      { new: true }
    )
    .then(
      res.json({ message: 'Friend Added!' })
    )
    .catch((err) => res.status(400).json(err));
  },

  removeFriend(req, res){
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.body.id } },
      { new: true }
    )
    .then(
      res.json({ message: 'Friend removed' })
    )
    .catch((err) => res.status(400).json(err));

    }
};
