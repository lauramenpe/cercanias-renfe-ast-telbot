const https = require('https');

function getWarningsByRegion(region, callback) {
    let options = {
        hostname: process.env.RENFE_HOSTNAME,
        path: process.env.RENFE_WARNING_PATH,
        headers: { 'User-Agent': process.env.RENFE_USER_AGENT }
    };

    https.get(options, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            let warnings = JSON.parse(data);
            callback(filterWarningsByRegion(warnings, region));
        });
    });
}

function filterWarningsByRegion(warnings, region) {
    return warnings.filter(obj => obj.tags.some(t => t.text == region));
}

module.exports = { getWarningsByRegion };