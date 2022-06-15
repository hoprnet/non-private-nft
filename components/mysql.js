const mysql = require('serverless-mysql');
const escape = require('sql-template-strings')


// CREATE TABLE ips (
//     ip varchar(150) NOT NULL UNIQUE,
//     country varchar(10),
//     count int,
//     PRIMARY KEY (ip)
// );


const db = mysql({
  config: {
    host     : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DATABASE_NAME,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
  }
})

const queryDB = async (query) => {
  let results = await db.query(query);
  await db.end();
  return results
}

export async function insertIp (ip, country) {
    console.log('MySQL: insertIp', ip);
    await queryDB(escape`
      INSERT INTO ips (ip, country, count) VALUES (${ip},${country},1)
      ON DUPLICATE KEY UPDATE count = count + 1;
    `)
}

export async function getTop10Ips () {
    console.log('MySQL: getTop10IPs');
    let query = await queryDB(escape`
      SELECT * FROM ips ORDER BY count DESC LIMIT 10;
    `);
  //  console.log('query', query)
    return query
}