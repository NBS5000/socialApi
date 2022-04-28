const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  getUsersThoughts,
  createThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/u/:username
router.route('/u/:username').get(getUsersThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);



module.exports = router;


