const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  getUsersThoughts,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);


// /api/thoughts/u/:username
router.route('/u/:username')
  .get(getUsersThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .put(addReaction);

// /api/thoughts/:thoughtId/reactions/:rid
router.route('/:thoughtId/reactions/:rid')
  .put(removeReaction);


module.exports = router;


