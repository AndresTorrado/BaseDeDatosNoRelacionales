const TelemetriaRepository = require('../repository/telemetria-repository');

module.exports = class TelemetriaService {
    constructor() {
        this.telemetriaRepository = new TelemetriaRepository()
    }

    async getTelemetria(telemetriaId) {
        var telemetria = await this.telemetriaRepository.get(telemetriaId);
        return telemetria;
    }

    async createTelemetria(newTelemetria){
        return await this.activityRepository.createTelemetria(newTelemetria);
    }
}