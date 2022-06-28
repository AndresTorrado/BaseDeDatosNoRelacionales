require('dotenv').config();
const Server = require('./server');
const Repository = require('./repository/telemetria-repository');

(async () => {
    try {
        await Repository.initRepo();
        await Server.initServer();
    } catch (err) {
        console.log('Server unable to init');
        process.exit(1);
    }
})()