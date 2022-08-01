const Interaction = require('../models/interaction');

async function createInteraction(userOneId, userTwoId, swiped) {
    const newInteraction = new Interaction({
        userOneId: userOneId,
        userTwoId: userTwoId,
        swiped: swiped
    });
    newInteraction.save();
}

module.exports = {
    createInteraction
};
