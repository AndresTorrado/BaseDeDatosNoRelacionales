const Express = require('express');
const Router = Express.Router();
const TelemetriaController = require('./telemetria-controller');

var telemetriaController = new TelemetriaController();

Router.get('/telemetrias',function (req, res) {
    telemetriaController.get(req, res);
});

Router.post('/telemetrias', 
    (req, res, nxt) => telemetriaController.post(req, res, nxt)
)

module.exports = Router