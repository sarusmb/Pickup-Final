const Match = require('../models/match');
const Interaction = require('../models/interaction');

async function getMatches(userId) {
    const usersLiked = await Interaction.find({
        userOneId: userId,
        swiped: true
    });
    const usersLikedBy = await Interaction.find({
        userTwoId: userId,
        swiped: true
    });
    const currentMatches = await Match.find({ userOneId: userId });
    let potentialMatches = [];
    let newMatches = [];

    for (const userLiked in usersLiked) {
        for (const userLikedBy in usersLikedBy) {
            if (userLiked.userOneId === userLikedBy.userTwoId) {
                potentialMatches.push({
                    userOneId: userId,
                    userTwoId: userLikedBy.userOneId
                });
            }
        }
    }

    newMatches = potentialMatches.filter((potentialMatch) => {
        for (const currentMatch in currentMatches) {
            return currentMatch.userOneId !== potentialMatch.userOneId;
        }
    });

    for (const newMatch in newMatches) {
        const newMatchCreated = new Match({
            userId,
            userIdTwo: newMatch.userTwoId
        });
        // if not in current matches array then save
        newMatchCreated.save();
    }
    return newMatches;
}

module.exports = {
    getMatches
};
