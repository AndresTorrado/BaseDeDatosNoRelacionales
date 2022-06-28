const TelemetriaService = require('../services/telemetria-service');

module.exports = class TelemetriaController {
    constructor() {
        this.telemetriaService = new TelemetriaService()
    }

    async get(req, res) {
        try{
            var telemetria = await this.telemetriaService.getTelemetria(req.query.vehicle)
            if (telemetria) {
                res.status(200);
                res.body = telemetria;
            } else {
                res.status(400);
                res.body = 'telemetria not found';
            }
        }catch(e){
            res.status(400);
            res.body = e.toString();
        }

        res.send({status: res.status, body: res.body});
    }

    async post(req, res) {
        try{
            var newTelemetria = await this.telemetriaService.createTelemetria(req.body)
            if (newTelemetria) {
                res.status(201);
                res.body = newTelemetria;
            } else {
                res.status(400);
                res.body = 'Could not create telemetria';
            }
        }catch(e){
            res.status(400);
            res.body = e.toString();
        }
        res.send({status: res.status, body: res.body});

    }

}