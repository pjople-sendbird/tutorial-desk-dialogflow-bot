const { desk } = require('../../utils/axios');

/**
 * We use this for updating user custom fields in a ticket
 * https://sendbird.com/docs/desk/v1/platform-api/guides/ticket#2-update-custom-fields-of-a-ticket
 */
const changeCustomerAddress = (customer, address) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {
                customFields: `{\"address\":\"${address}\"}`,
            };
            desk
                .patch(`/customers/${customer}/custom_fields`, data)
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

module.exports = changeCustomerAddress;
