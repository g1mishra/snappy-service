export const ENV = {
  PRODUCTION: {
    KEY: 'production',
  },
  LOCAL: {
    KEY: 'local',
  },
};

let config = {};
//eslint-disable-next-line
if (process.env?.REACT_APP_ENV?.includes('production')) {
  config = require('./config.prod.js'); // eslint-disable-line global-require
} else {
  config = require('./config.local.js'); // eslint-disable-line global-require
}

export default config = {
  debugMode: config.config.debugMode,
  api_key: config.config.api_key,
  serverURL: config.config.serverURL,
};
