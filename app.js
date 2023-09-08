const renfeService = require('./services/renfeService');
const telegramService = require('./services/telegramService');

// renfeService.getWarningsByRegion("Asturias", (warnings) => {
//     warnings.forEach(warning => {
//       telegramService.sendWarningToChannel(warning);
//     });
//   }
// );

const twitterApi = require('twitter-api-v2');

const appOnlyClient = new twitterApi(process.env.TWITTER_BEARER_TOKEN);

const tweets = appOnlyClient.v1.tweets({ q: '@Inforenfe'}, { map: true });