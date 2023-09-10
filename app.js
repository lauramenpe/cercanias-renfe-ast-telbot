require('dotenv').config();

const cron = require('node-cron');

const telegramService = require('./services/telegramService');
const renfeService = require('./services/renfeService');
const twitterService = require('./services/twitterService');

cron.schedule(process.env.JOB_RENFE_WARNINGS, () => {
    renfeService.getWarningsByRegion("Asturias", warnings => {
        warnings.forEach(warning => {
            telegramService.sendWarningToChannel(warning);
        });
      }
    );
});

var lastDate = Date.now();
cron.schedule(process.env.JOB_RENFE_TWEETS, () => {
    twitterService.getTweetsByRegionAndDate("Asturias", lastDate, tweets => {
        tweets.forEach(tweet => {
            telegramService.sendTweetToChannel(tweet);
        });
        lastDate = Date.now();
    });
});