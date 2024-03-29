require('dotenv').config();

const express = require("express");
const app = express();

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const cron = require('node-cron');

const telegramService = require('./services/telegramService');
const renfeService = require('./services/renfeService');
const twitterService = require('./services/twitterService');
const dateService = require('./services/dateService');

const regionName = "Asturias";

console.log(`Scheduling cron jobs`);

cron.schedule(process.env.JOB_RENFE_WARNINGS, () => {
    console.log(`Getting Renfe warnings by ${regionName} region`);
    renfeService.getWarningsByRegion(regionName, (warnings) => {
        if(warnings && warnings.length > 0) {
            console.log(`Sending ${warnings.length} warning/s to Telegram channel`);
            warnings.forEach(warning => {
                telegramService.sendWarningToChannel(warning);
            });
        } else {
            console.log('There are no warnings to send');
        }
      }
    );
}, { timezone: process.env.TIMEZONE });

var lastDate = dateService.getActualDate();
dateService.dateMinusHours(lastDate, 1);

cron.schedule(process.env.JOB_RENFE_TWEETS, () => {
    console.log(`Getting tweets by ${regionName} and ${lastDate} date`);
    twitterService.getTweetsByRegionAndDate(regionName, lastDate, (tweets) => {
        if(tweets && tweets.length > 0) {
            console.log(`Sending ${tweets.length} tweet/s to Telegram channel`);
            tweets.forEach(tweet => {
                telegramService.sendTweetToChannel(tweet);
            });
        } else {
            console.log('There are no tweets to send');
        }
        lastDate = dateService.getActualDate();
    });
}, { timezone: process.env.TIMEZONE });