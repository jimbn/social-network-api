const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    }, 
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtValue => dateFormat(createdAtValue),
    }
},
{
    toJson: {
        getters: true
    }
},
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: 'You need to leave a thought!',
          minlength: 1,
          maxlength: 280
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        },
        username: {
          type: String,
          required: true,
        },
        reactions: [ReactionSchema]
      },
      {
        toJSON: {
          getters: true
        },
        id: false
      }

);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

