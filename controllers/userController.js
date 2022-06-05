const { User } = require('../models');

module.exports = {
    getAllUser: (req,res) => {
        User.find()
        .select('-__v')
        .then((users) => {
          res.json(users);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    getUserById: (req,res) => {
        User.findById(req.params.userId )
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((user) => {
          if (!user) {
            return res.json({ message: 'No user found with this id!' });
          }
          res.json(user);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    createUser: (req,res) => {
        User.create(req.body)
        .then((user) => {
          res.json(user);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    updateUserById: (req,res) => {
        User.findByIdAndUpdate(req.params.userId, {$set: req.body,}, {  new: true, runValidators: true, })
            .then((user) => {
              if (!user) {
                return res.json({ message: 'No user found with this id!' });
              }
              res.json(user);
            })
            .catch((e) => {
              res.json(e);
            });
    },

    deleteUserById: (req,res) => {
        User.findByIdAndDelete(req.params.userId)
        .then((user) => {
          if (!user) {
            return res.json({ message: 'No user found with this id!' });
          }
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        })
        .catch((e) => {
          res.json(e);
        });
    },

    addFriend: (req, res) => {
        User.findOneAndUpdate(req.params.userId , { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
          }
          res.json(user);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    deleteFriend: (req, res) => {
    User.findOneAndUpdate(req.params.userId , { $pull: { friends: req.params.friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
      })
      .catch((e) => {
        res.json(e);
      });
    },
};