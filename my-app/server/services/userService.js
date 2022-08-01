const Match = require('../models/match');
const Interaction = require('../models/interaction');
const User = require('../models/user');
const queries = require('../../server/database/queries');

async function getNeverSeenBeforeUsers(userId) {
    const allUsers = await User.find({});
    const interactedWithUsers = await Interaction.find({ userIdOne: userId });
    const neverSeenBeforeUsers = [];

    console.log(interactedWithUsers);

    for (const user in allUsers) {
        for (const interactedWithUser in interactedWithUsers) {
            console.log(interactedWithUser.userTwoId);
            if (user._id !== interactedWithUser.userTwoId) {
                neverSeenBeforeUsers.push(user);
            }
        }
    }

    return neverSeenBeforeUsers;
}

async function getUsers() {
    const users = await queries.getUsers();
    return users;
}

async function getUserProfile(id) {
    const user = await queries.getUser({ _id: id });
    return user;
}

async function editUserProfile({ id, updatedFields }) {
    const users = await queries.getUser({ _id: id });
    const user = users[0];

    Object.keys(updatedFields).forEach((name) => {
        const value = updatedFields[name];
        user[name] = value;
    });

    user.save();
    return user;
}

module.exports = {
    getNeverSeenBeforeUsers,
    getUsers,
    getUserProfile,
    editUserProfile
};
