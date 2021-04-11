# Sendbird BotSyncServer

BotSyncServer is a middleman server that helps connect chat bot services, such as Google DialogFlow, with Sendbird chat.
It can be setup for either core Sendbird Chat or Sendbird Desk

## Installation

Clone the repository to your local machine and install dependancies

```bash
npm install
```

## Configuration

In order to utilize this repository, you'll need to create a `.env` file in the root directory, and fill it with the following:

```bash
# Express
PORT=5500

# DialogFlow
GCLOUD_PROJECT_ID=
GCLOUD_CLIENT_EMAIL=
GCLOUD_PRIVATE_KEY=

# Sendbird Chat
SB_CHAT_APP_ID=
SB_CHAT_API_TOKEN=

# Sendbird Desk
SB_DESK_APP_ID=
SB_DESK_API_TOKEN=

```

Once your `.env` file has been configured, you can run the server by using with:

```bash
npm run dev
```

This will start the server with nodemon and the `NODE_ENV=development`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
