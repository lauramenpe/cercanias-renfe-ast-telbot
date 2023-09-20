const moment = require('moment-timezone');

function getActualDate() {
    return moment.utc(moment.tz(process.env.TIMEZONE).format(process.env.DATE_FORMAT)).toDate();
}

function dateMinusHours(date, hours) {
    date.setHours(date.getHours() - hours);
}

function formatDate(dateStr) {
    return moment(new Date(dateStr)).format(process.env.DATE_FORMAT_UI);
}

module.exports = { getActualDate, formatDate, dateMinusHours };