const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const totalUser = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
// const grade = async (userId) =>
//   User.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

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
  // deleteUser(req, res) {
  //   User.findOneAndDelete({ id: req.params.id })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: 'No such user exists' })
  //         : Thought.deleteMany(
  //             { username: user.username },
  //             { new: true }
  //           )
  //     )
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({
  //             message: 'User deleted, but no thoughts found',
  //           })
  //         : res.json({ message: 'User successfully deleted' })
  //     )
  //     .catch((err) => {
  //       // console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        
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


  // Add a thought to a user
  // addThought(req, res) {
  //   console.log('You are adding an thought');
  //   console.log(req.body);
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'No user found with that ID :(' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },



  // Remove thought from a user
  // removeThought(req, res) {
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'No user found with that ID :(' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
