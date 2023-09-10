const { Rettiwt } = require('rettiwt-api');

const rettiwt = new Rettiwt(process.env.TWITTER_API_KEY);

function getTweetsByRegionAndDate(region, date, callback) {
    rettiwt.tweet.search({
        fromUsers: ['InfoAdif', 'Inforenfe'],
        words: [region],
        startDate: date
    })
    .then(data => {
        callback(data.list.sort((t1, t2) => t2.createdAt - t1.createdAt));
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = { getTweetsByRegionAndDate };