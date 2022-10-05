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

const queryDBTransaction = async (query1, query2, query3, query4) => {
  try {
    let results;
    if (query4) {
      results = await db.transaction()
      .query(query1)
      .query(query2)
      .query(query3)
      .query(query4)
      .commit() // execute the queries
    } else if (query3) {
      results = await db.transaction()
      .query(query1)
      .query(query2)
      .query(query3)
      .commit() // execute the queries
    } else {
      results = await db.transaction()
      .query(query1)
      .query(query2)
      .commit() // execute the queries
    }
 //   let results = await db.transaction()
 //   console.log(arguments)
  //  arguments.map(query => {db.query(query)});
  //  db.commit();
    await db.end();
    return results;
  } catch (error) {
    throw error
  }
}

export async function insertIpToScoreboard (ip, country) {
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
    return query
}

export async function insertIpToEthCCParis2022AndGetCount (nftId, ip) {
  console.log('MySQL: insertIpToEthCCParis2022AndGetCount');
  let insert = escape`
    INSERT INTO ethcc_paris_2022 (nftId, ip) VALUES (${nftId},${ip})
  `
  let getCount = escape`
    SELECT COUNT(nftId) as count FROM ethcc_paris_2022 WHERE nftId = ${nftId};
  `
  let query = await queryDBTransaction(insert, getCount);
  let count = query[1][0].count;
  return count;
}

export async function insertIpToDemoAndGetCount (nftId, ip) {
  console.log('MySQL: insertIpToDemoAndGetCount');
  let insert = escape`
    INSERT INTO demo_nft (nftId, ip) VALUES (${nftId},${ip})
  `
  let getCount = escape`
    SELECT COUNT(nftId) as count FROM demo_nft WHERE nftId = ${nftId};
  `
  let query = await queryDBTransaction(insert, getCount);
  let count = query[1][0].count;
  return count;
}

