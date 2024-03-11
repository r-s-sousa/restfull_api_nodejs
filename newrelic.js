'use strict';

require('dotenv').config();

const NEW_RELIC_APP_NAME = process.env.NEW_RELIC_APP_NAME;
const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY;

exports.config = {
    app_name: [NEW_RELIC_APP_NAME],
    license_key: NEW_RELIC_LICENSE_KEY
};
