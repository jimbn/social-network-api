const { Thought, User } = require('../models');

module.exports = {
       getAllThoughts: (req, res) => {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughts) => {
          res.json(thoughts);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    getThoughtsById: (req, res) => {
        Thought.findById(req.params.thoughtId)
        .then((thought) => {
          if (!thought) {
            return res.json({ message: 'No thought found with this id!' });
          }
          res.json(thought);
        })
        .catch((e) => {
          res.json(e);
        });
    },

  

    createThought: (req, res) => {
        Thought.create(req.body)
        .then((thought) => {
          return User.findByIdAndUpdate(req.body.userId, 
            { $push: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) => {
          if (!user) {
            return res.json({ message: 'Thought created but no user found with this id!' });
          }
          res.json({ message: 'Thought successfully created!' });
        })
        .catch((e) => {
          res.json(e);
        });
    },

    updateThoughtById: (req, res) => {
        Thought.findByIdAndUpdate(req.params.thoughtId, { $set: req.body }, { runValidators: true, new: true })
        .then((thought) => {
          if (!thought) {
            return res.json({ message: 'No thought found with this id!' });
          }
          res.json(thought);
        })
        .catch((e) => {
          res.json(e);
        });
    },

    deleteThoughtById: (req, res) => {
        Thought.findByIdAndDelete(req.params.thoughtId )
        .then((thought) => {
          if (!thought) {
            return res.json({ message: 'No thought found with this id!' });
          }
            return User.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
        })
        .then((user) => {
          if (!user) {
            return res.json({ message: 'Thought created but no user found with this id!' });
          }
          res.json({ message: 'Thought successfully deleted!' });
        })
        .catch((e) => {
          res.json(e);
        });
    },

    addReaction: (req, res) => {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((thought) => {
              if (!thought) {
                return res.json({ message: 'No thought found with this id!' });
              }
              res.json(thought);
            })
            .catch((e) => {
              res.json(e);
            });
    },

    deleteReactionById: (req, res) => {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
                return res.json({ message: 'No thought found with this id!' });
            }
                res.json(thought);
            })
        .catch((e) => {
            res.json(e);
        }); 
    },

};