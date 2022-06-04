const { User } = require('../models');

module.exports = {
    getAllUser: async (req,res) => {
        User.find()
        .select('-__v')
        .then((users) => {
          res.json(users);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    getUserById: async (req,res) => {
        User.findById(req.params.userId )
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((user) => {
          if (!user) {
            return res.json({ message: 'No user with this id!' });
          }
          res.json(user);
        })
        .catch((e) => {
          console.log(e);
          res.json(e);
        });
    },

    createUser: async (req,res) => {
        User.create(req.body)
        .then((user) => {
          res.json(user);
        })
        .catch((e) => {
          console.log(e);
          res.json(e);
        });
    },

    updateUserById: async (req,res) => {
        User.findByIdandUpdate(req.params.userId, {$set: req.body,}, {  new: true, runValidators: true, })
            .then((user) => {
              if (!user) {
                return res.json({ message: 'No user with this id!' });
              }
              res.json(user);
            })
            .catch((e) => {
              console.log(e);
              res.json(e);
            });
    },

    deleteUserById: async (req,res) => {
        User.findByIdAndDelete(req.params.userId)
        .then((user) => {
          if (!user) {
            return res.json({ message: 'No user with this id!' });
          }
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        })
        .catch((e) => {
          console.log(e);
          res.json(e);
        });
    },

    addFriend: async (req, res) => {
        User.findOneAndUpdate(req.params.userId , { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(user);
        })
        .catch((e) => {
          console.log(e);
          res.json(e);
        });
    },

    deleteFriend: async (req, res) => {
    User.findOneAndUpdate(req.params.userId , { $pull: { friends: req.params.friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
    },
};