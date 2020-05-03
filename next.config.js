require('dotenv').config();

module.exports = {
  env: {
    apiKey: process.env.apiKey,
    appId: process.env.appId,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    measurementId: process.env.measurementId,
    movieApiKey: process.env.movieApiKey,
    databaseURL: process.env.databaseURL,
    sercet: process.env.sercet,
  },
};
