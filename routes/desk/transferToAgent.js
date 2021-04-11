const { desk } = require('../../utils/axios');

/**
 * We send a request to Sendbird Desk using Platform API
 * for transfering this ticket to a human Agent.
 * 
 * Check this link for more information:
 * https://sendbird.com/docs/desk/v1/platform-api/guides/ticket#2-cancel-an-assignment
 * 
 */
const transferToAgent = (ticketId) => {
    return new Promise((resolve, reject) => {
        try {
            desk
                .patch(`tickets/${ticketId}/cancel`, {})
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = transferToAgent;
