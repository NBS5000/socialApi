const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addAssignment,
  removeAssignment,
  updateThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/assignments
router.route('/:thoughtId/assignments').post(addAssignment);

// /api/thoughts/:thoughtId/assignments/:assignmentId
router.route('/:thoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;

// to do
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
