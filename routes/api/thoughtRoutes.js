const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReactionById
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById);

module.exports = router;
