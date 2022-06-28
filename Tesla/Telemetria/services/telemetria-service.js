const TelemetriaRepository = require('../repository/telemetria-repository');

module.exports = class TelemetriaService {
    constructor() {
        this.telemetriaRepository = new TelemetriaRepository()
    }

    async getTelemetria(vehicle) {
        var telemetria = await this.telemetriaRepository.getTelemetria(vehicle);
        return telemetria;
    }

    async createTelemetria(newTelemetria){
        return await this.telemetriaRepository.createTelemetria(newTelemetria);
    }
}