const express = require('express');
const router = express.Router();
const { desk } = require('../../utils/axios');
const sendToDialogFlow = require('../../utils/sendToDialogFlow');
const closeTicket = require('./closeTicket');
const transferToAgent = require('./transferToAgent');

let userContexts = {};

const postToSendbird = (botWebhookEventId, botId, message) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {
                message,
                botWebhookEventId,
            };
            desk
                .post(`/bots/${botId}/send_message`, data)
                .then((response) => {
                    if (response.status === 200) {
                        resolve();
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Sendbird Bot will send messages and ticket info
 * to this callback (you must define a callback for a Bot
 * when you create it from your Dashboard)
 */
router.post('/callback', async (req, res) => {
    try {
        const { botWebhookEvent, ticket } = req.body;
        const ticketId = botWebhookEvent.chatMessage.ticket;
        if (botWebhookEvent && ticket) {
            /**
             * What we receive from the customer
             * we send it to DialogFlow
             */
            sendToDialogFlow(
                botWebhookEvent.chatMessage.message,
                ticket.customer.id,
                userContexts[ticket.customer.id]
            )
                .then((response) => {
                    if (response[0].queryResult.outputContexts) {
                        userContexts[ticket.customer.id] = response[0].queryResult.outputContexts;
                    }
                    const messageText = response[0].queryResult.fulfillmentText;
                    /**
                     * Sent to Sendbird Desk what we receive
                     * from DialogFlow as a response.
                     */
                    postToSendbird(
                        botWebhookEvent.id,
                        botWebhookEvent.bot,
                        messageText
                    )
                        .then(() => {
                            /**
                             * Analyze payload and get IntentName
                             * responding.
                             */
                            const IntentName = response[0].queryResult.intent.displayName;
                            /**
                             * We act according to the Intent name received.
                             * Change these case according to your Intent names 
                             * defined in DialogFlow.
                             */
                            switch (IntentName) {
                                /**
                                 * Intent is "Close ticet"
                                 */
                                case 'Close ticket':
                                    closeTicket(ticketId).then((response) => {
                                        if (response.status === 200) {
                                            res.sendStatus(200);
                                        } else {
                                            res.sendStatus(500);
                                        }
                                    });
                                    break;
                                /**
                                 * More intent names...
                                 * These will result on transfering this ticket 
                                 * to a human Agent.
                                 */
                                case 'Previous Service (Pass to agent)':
                                case 'Request for Live Agent':
                                    transferToAgent(ticketId).then((response) => {
                                        if (response.status === 200) {
                                            res.sendStatus(200);
                                        } else {
                                            res.sendStatus(500);
                                        }
                                    });
                                    break;
                                default:
                                    res.sendStatus(200);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            console.log(err.response.status);
                            console.log(err.response.statusText);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
