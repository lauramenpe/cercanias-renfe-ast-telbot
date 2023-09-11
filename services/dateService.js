const moment = require('moment-timezone');

function getActualDate() {
    return moment().tz(process.env.TIMEZONE).toDate();
}

function formatDate(dateStr) {
    return moment(new Date(dateStr)).tz(process.env.TIMEZONE).format(process.env.DATE_FORMAT);
}

module.exports = { getActualDate, formatDate };