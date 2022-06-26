module.exports.initServer = async function () {

    const Express = require('express');
    const App = Express();

    const Port = '8080'
    const Url = 'http://localhost:8080/'

    const Router = require('./controllers/router');

    const Cors = require('cors');

    App.use(Cors())
    App.use(Express.urlencoded({ extended: false }))
    App.use(Express.json())
    App.use(Url, Router)
    App.listen(Port, () => {
        console.log(`Server available on port ${Port}`)
    })
}