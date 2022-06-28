const {User, Thought} = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            let users = await User.find({}).populate({path: 'thoughts', select: '-__v'}).select('-__v').sort({_id: -1});
            res.json(users)
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async getUserById({params}, res) {
        try {
            let user = await User.findOne({_id: params.id}).populate({path: 'thoughts', select: '-__v'}).select('-__v');
            if (!user) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async createUser({body}, res) {
        try {
            let user = await User.create(body);
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateUser({params, body}, res) {
        try {
            let user = await User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true});
            if (!user) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteUser({params}, res) {
        try {
            let user = await User.findOneAndDelete({_id: params.id});
            if (!user) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            let thought = await Thought.deleteMany({userId: params.id});
            if (!thought) {
                res.json(user, {message: 'No thoughts associated with this user found'});
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addFriend({params}, res) {
        try {
            let friend = await User.findOneAndUpdate({__id: params.id}, {$addToSet: {friends: params.friendId}}, {new: true});
            if (!friend) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(friend);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    async deleteFriend({params}, res) {
        try {
            let friend = await User.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true});
            res.json(friend);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    }
}

module.exports = userController;