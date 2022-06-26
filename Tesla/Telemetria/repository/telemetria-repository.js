var cassandra = require('cassandra-driver');

module.exports = class TelemetriaRepository {
    constructor() {
    }

    async createTelemetria(reqBody) {
        var insert = `INSERT INTO tesla.telemetria (id, user, date, kudos, comments, title, text)
        VALUES( 
            ${uuidv1()}, 
            '${reqBody.user.toString()}', 
            '${reqBody.date}', 
            0, 
            {''}, 
            '${reqBody.title}', 
            '${reqBody.text}'
        );`

        await client.execute(insert)
        
        return "Ok"
    }

    async getTelemetria(telemetriaId){
        var query = `SELECT * FROM tesla.telemetria WHERE id='${telemetriaId}';`

        var result = await client.execute(query)
        
        return result.rows
    }

    static async initRepo(){
        const client = new cassandra.Client(
            {
                contactPoints: ['127.0.0.1'],
                localDataCenter: 'dc1',
                queryOptions: { consistency: cassandra.types.consistencies.any }
            }
        );
        
        client.connect().then(function () {
            var keyspaceQuery = "CREATE KEYSPACE IF NOT EXISTS tesla WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};";
            return client.execute(keyspaceQuery);
        }).then(function () {
            var tableQuery = `CREATE TABLE IF NOT EXISTS tesla.telemetria (
                                id uuid,
                                user Varchar,
                                date timestamp,
                                kudos int,
                                comments set<text>,
                                title Varchar,
                                url Varchar,
                                comment Varchar,
                                type Varchar,
                                duration Double,
                                distance Double,
                                text Varchar,
                                photo Varchar,
                                description Varchar,
                                effort int,
                                location Varchar,
                                average_speed Double,
                                cadence Double,
                                calories Double,
                                PRIMARY KEY (user, date, id)
                            ) WITH CLUSTERING ORDER BY (date DESC);`
            return client.execute(tableQuery);
        })
        .catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown().then(() => { throw err; });
        });
    }
}