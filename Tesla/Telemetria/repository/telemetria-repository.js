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
        var insert = `INSERT INTO tesla.telemetria (id, vehicle, date, wave, temperature, vibration, pressure, voltage, speed, time)
        VALUES(${uuid.v1()},'${reqBody.vehicle}','${reqBody.date}',${reqBody.wave},${reqBody.temperature},${reqBody.vibration},${reqBody.pressure},${reqBody.voltage},${reqBody.speed},${reqBody.time});`;
        await client.execute(insert);
        return 'Telemetria created sucesfully';
    }

    async getTelemetria(vehicle){
        var query = `SELECT * FROM tesla.telemetria WHERE vehicle='${vehicle}';`

        var result = await client.execute(query)
        
        return result.rows
    }

    static async initRepo(){
        
        client.connect().then(function () {
            var keyspaceQuery = "CREATE KEYSPACE IF NOT EXISTS tesla WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};";
            return client.execute(keyspaceQuery);
        }).then(function () {
            var tableQuery = `CREATE TABLE IF NOT EXISTS tesla.telemetria (
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
            return client.execute(tableQuery);
        })
        .catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown().then(() => { throw err; });
        });
    }
}