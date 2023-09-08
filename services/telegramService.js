const telegramBot = require('node-telegram-bot-api');

const tokenBot = process.env.TELEGRAM_BOT_TOKEN;
const bot = new telegramBot(tokenBot, {polling: true});

const channelId = process.env.TELEGRAM_CHANNEL_ID;

function sendWarningToChannel(warning) {
    console.log(warning);
    bot.sendMessage(channelId, warning.paragraph);
}

module.exports = { sendWarningToChannel };