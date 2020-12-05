process.env.ORA_SDTZ = 'UTC';
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
//
// oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_8' });                            // Windows
// oracledb.initOracleClient({ libDir: '/Users/your_username/Downloads/instantclient_19_8' }); // macOS
async function run(req, res) {
    let connection;
    try {
        let sql, binds, options, result;
        connection = await oracledb.getConnection(dbConfig);
        console.log(connection)
        res.status(200).send('Hello world');
        // //
        // // Create a table
        // //
        // const stmts = [
        //   `DROP TABLE no_example`,
        //   `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
        // ];
        // for (const s of stmts) {
        // try {
        //     await connection.execute(s);
        // } catch (e) {
        //     console.log(e)
        //     if (e.errorNum != 942)
        //         console.error(e);
        // }
        // }
        // //
        // // Insert three rows
        // //
        // sql = `INSERT INTO no_example VALUES (:1, :2)`;
        // binds = [
        //   [101, "Alpha" ],
        //   [102, "Beta" ],
        //   [103, "Gamma" ]
        // ];
        // // For a complete list of options see the documentation.
        // options = {
        //   autoCommit: true,
        //   // batchErrors: true,  // continue processing even if there are data errors
        //   bindDefs: [
        //     { type: oracledb.NUMBER },
        //     { type: oracledb.STRING, maxSize: 20 }
        //   ]
        // };
        // result = await connection.executeMany(sql, binds, options);
        // console.log("Number of rows inserted:", result.rowsAffected);
        // //
        // // Query the data
        // //
        // sql = `SELECT * FROM no_example`;
        // binds = {};
        // // For a complete list of options see the documentation.
        // options = {
        //   outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        //   // extendedMetaData: true,               // get extra metadata
        //   // prefetchRows:     100,                // internal buffer allocation size for tuning
        //   // fetchArraySize:   100                 // internal buffer allocation size for tuning
        // };
        // result = await connection.execute(sql, binds, options);
        // console.log("Metadata: ");
        // console.dir(result.metaData, { depth: null });
        // console.log("Query results: ");
        // console.dir(result.rows, { depth: null });
        // //
        // // Show the date.  The value of ORA_SDTZ affects the output
        // //
        // sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
        // result = await connection.execute(sql, binds, options);
        // console.log("Current date query results: ");
        // console.log(result.rows[0]['CD']);
    } catch (err) {
        console.error("EEROR 1", err);
        res.status(400).send(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("EEROR 2", err);
                res.status(400).send(err);
            }
        }
    }
}
module.exports.run = run;