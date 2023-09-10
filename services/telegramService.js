const moment = require('moment');
const TelegramBot = require('node-telegram-bot-api');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, {polling: true});

const channelId = process.env.TELEGRAM_CHANNEL_ID;

function sendWarningToChannel(warning) {
    let renfeLink = `https://${process.env.RENFE_HOSTNAME}${warning.link}`;
    sendMessageToChannel(`<b>Aviso de Renfe</b>:\n<i>${warning.chipText}</i>\n${warning.paragraph}\n<a href="${renfeLink}">Ver aviso</a>`);
}

function sendTweetToChannel(tweet) {
    let tweetUsername = tweet.tweetBy.userName;
    let tweetLink = `https://${process.env.TWITTER_HOSTNAME}/${tweetUsername}/status/${tweet.id}`;
    let tweetDate = moment(new Date(tweet.createdAt)).format('DD-MM-YYYY HH:mm:ss');
    sendMessageToChannel(`Tweet de <b>@${tweetUsername}</b> el ${tweetDate}:\n${tweet.fullText}\n<a href="${tweetLink}">Ver tweet</a>`);
}

function sendMessageToChannel(message) {
    bot.sendMessage(channelId, message, {parse_mode: 'HTML'}).catch((error) => {
        console.log(error.code);
        console.log(error.response.body);
    });
}

module.exports = { sendWarningToChannel, sendTweetToChannel };