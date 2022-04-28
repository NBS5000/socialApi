const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend
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

module.exports = router;