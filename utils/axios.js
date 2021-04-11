const axios = require('axios');

/**
 * Send commands to sendbird chat (not used in this tutorial)
 */
const chat = axios.create({
    baseURL: `https://api-${process.env.SB_CHAT_APP_ID}.sendbird.com/v3`,
    headers: {
        'Api-Token': process.env.SB_CHAT_API_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
    },
});

/**
 * Send commands to Desk API
 */
const desk = axios.create({
    baseURL: `https://desk-api-${process.env.SB_DESK_APP_ID}.sendbird.com/platform/v1`,
    headers: {
        SENDBIRDDESKAPITOKEN: process.env.SB_DESK_API_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
    },
});

module.exports = {
    desk,
    chat,
};
