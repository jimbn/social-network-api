const res = require('express/lib/response');
const { Thought, User } = require('../models');

module.exports = {
    createThought: async (req, res) => {
        const { thoughtText } = req.body;

        try {
            const createThought = await Thought.create({
                task,
                username: '',
            });
        } catch (error) {
            res.json(error);
        }
    },

    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({
                username: '',
                active: true,
            }).populate({
                path:'username'
            });
            res.json(thoughts);
        } catch (error) {
            res.json(error);
        }
    },

    getThoughtsById: async (req, res) => {
        try {
            const thought = await User.findById(req.params.id);
            res.json(thought);
        } catch (error) {
            res.json(error);
        }
    },

    updateThoughtById: async (req, res) => {

    },

    deleteThoughtById: async (req, res) => {

    },

    addReaction: async ({ params, body }, res) => {

    },

    deleteReactionById: async ({ params}, res) => {

    },

};