const TelemetriaService = require('../services/telemetria-service');

module.exports = class TelemetriaController {
    constructor() {
        this.telemetriaService = new TelemetriaService()
    }

    async get(req, res) {
        try{
            var telemetria = await this.telemetriaService.getTelemetria(req.telemetriaId)
            if (telemetria) {
                res.status(200)
                res.body = { status: 200, message: value }
            } else {
                res.status(400)
                res.body = { status: 400, message: `Invalid Api data` }
            }
        }catch(e){
            res.status(400)
            res.body = { status: 400, message:  e.toString() }
        }
        res.send(res.body)
    }

    async post(req, res) {
        try{
            var newTelemetria = await this.telemetriaService.createTelemetria(req.body)
            if (newTelemetria) {
                res.status(201)
                res.body = { status: 201, message: value }
            } else {
                res.status(400)
                res.body = { status: 400, message: `Invalid Api data` }
            }
        }catch(e){
            res.status(400)
            res.body = { status: 400, message:  e.toString() }
        }
        res.send(res.body)
    }

}