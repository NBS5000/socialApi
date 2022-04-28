const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/f/:id')
  .put(addFriend);

  router.route('/r/:id')
  .put(removeFriend);
  

module.exports = router;