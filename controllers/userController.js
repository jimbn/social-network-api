const { User } = require('../models');

module.exports = {
    createUser: async (req,res) => {
        const {
            username,
            email,
        } = req.body;

        try {
            const newUser = await User.create({
                username,
                email,
            });
            res.json(newUser);
        } catch (error) {
            res.json(error);
        }
    },

    getAllUser: async (req,res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },

    getUserById: async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    updateUserById: async (req,res) => {
        const{
            username,
            email,
        } = req.body;
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    username,
                    email,
                },
                {
                    new: true,
                }
            );

            res.json(updateUser)
        } catch (error) {
            res.json(error);
        }
    },

    deleteUserById: async (req,res) => {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            res.json(deleteUser);
        } catch (error) {
            res.json(error);
        }
    },
};