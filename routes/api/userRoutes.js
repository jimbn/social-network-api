const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUser).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;