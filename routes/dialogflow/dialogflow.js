const express = require('express');
const router = express.Router();
const changeCustomerAddress = require('../../actions/dialogflow/changeCustomerAddress');

/**
 * We receive responses from DialogFlow as fulfillments.
 * Define this from your DialogFlow console.
 */
router.post('/fullfilment', async (req, res) => {
    try {
        /**
         * Analyze payload and get intent name sent.
         */
        const intentName = req.body.queryResult.intent.DisplayName;
        /**
         * Change for the intent names you create 
         * in your DialogFlow account.
         * 
         * For this example we will change a custom field 
         * for a ticket. Check this API call for more 
         * information: 
         * 
         * https://sendbird.com/docs/desk/v1/platform-api/guides/ticket#2-update-custom-fields-of-a-ticket
         */
        switch (intentName) {
            case 'Address change':
                const address = req.body.queryResult.parameters.address;
                const customer = req.body.originalDetectIntentRequest.payload.username;
                changeCustomerAddress(customer, address).then((response) => {
                    if (response.status === 200) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500);
                    }
                });

            default:
                res.sendStatus(200);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
