const { desk } = require('../../utils/axios');

/**
 * Send to Sendbird Desk using Platform API a 
 * command for closing a ticket.
 * 
 * https://sendbird.com/docs/desk/v1/platform-api/guides/ticket#2-close-a-ticket
 */
const closeTicket = (ticketId) => {
    return new Promise((resolve, reject) => {
        try {
            desk
                .patch(`tickets/${ticketId}/close`, {})
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

module.exports = closeTicket;
