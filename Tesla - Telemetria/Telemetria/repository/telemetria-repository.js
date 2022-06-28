var cassandra = require('cassandra-driver');
const uuid = require('uuid');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1'
});
module.exports = class TelemetriaRepository {
    constructor() {
    }

    async createTelemetria(reqBody) {
        var newTelemetria = `INSERT INTO tesla.telemetria (id, vehicle, date, wave, temperature, vibration, pressure, voltage, speed, time)
        VALUES(${uuid.v1()},'${reqBody.vehicle}','${reqBody.date}',${reqBody.wave},${reqBody.temperature},${reqBody.vibration},${reqBody.pressure},${reqBody.voltage},${reqBody.speed},${reqBody.time});`;
        await client.execute(newTelemetria);
        return 'Telemetria created sucesfully';
    }

    async getTelemetria(vehicle){
        var search = `SELECT * FROM tesla.telemetria WHERE vehicle='${vehicle}';`;
        var retrievedTelemetria = await client.execute(search);
        return retrievedTelemetria.rows;
    }

    static async initRepo(){
        
        client.connect().then(function () {
            var createKeySpace = "CREATE KEYSPACE IF NOT EXISTS tesla WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};";
            return client.execute(createKeySpace);
        }).then(function () {
            var createTable = `CREATE TABLE IF NOT EXISTS tesla.telemetria (
                                id uuid,
                                vehicle Varchar,
                                date timestamp,
                                wave int,
                                temperature int,
                                vibration int,
                                pressure int,
                                voltage int,
                                speed int,
                                time int,
                                PRIMARY KEY (vehicle, date, id)
                            ) WITH CLUSTERING ORDER BY (date DESC);`
            return client.execute(createTable);
        }).catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown().then(() => { throw err; });
        });
    }
}