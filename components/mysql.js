const mysql = require('serverless-mysql');
const escape = require('sql-template-strings')


// CREATE TABLE users (
//     UserID int NOT NULL AUTO_INCREMENT UNIQUE,
//     Email varchar(150) NOT NULL,
//     Username varchar(150),
//     Name varchar(256),
//     ProviderID int NOT NULL,
//     EmailApproval BOOLEAN,
//     Activated BOOLEAN,
//     created_at varchar(32),
//     PRIMARY KEY (UserID),
//     FOREIGN KEY (ProviderID) REFERENCES login_providers(ProviderID)
// );
// ALTER TABLE `users` ADD UNIQUE `unique_index`(`Email`, `ProviderID`);


const db = mysql({
  config: {
    host     : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DATABASE_NAME,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD
  }
})

queryDB = async (query) => {
  let results = await db.query(query);
  await db.end();
  return results
}

export async function createUser (payload) {
    console.log('MySQL: createUser');
    let query = await queryDB(escape`
    INSERT INTO users 
    (Email,ProviderID,EmailApproval,Activated,Username,Name,created_at) 
    VALUES (
      ${payload.email},
      (SELECT ProviderID FROM login_providers WHERE ProviderName = ${payload.provider}),
      1,
      ${payload.activated},
      ${payload.username},
      ${payload.name},
      ${Date.now()}
    )
    ON DUPLICATE KEY UPDATE UserID=UserID;
    `)
    let insertId = false;
    if(query.insertId !== 0) insertId = query.insertId;  //if insertId is present, that means that user was created
    if (query.error) {
      return {status: 400}
    }
    return {status: 200, insertId}
}

export async function getUserID (payload) {
    console.log('MySQL: getUserID');
    let query = await queryDB(escape`
      SELECT
        UserID
      FROM
        users
      WHERE   
        Email = ${payload.email}
          AND
        ProviderID = (SELECT ProviderID FROM login_providers WHERE ProviderName = ${payload.provider});
    `);
    console.log(query)
    if (query.length > 0 && query[0].UserID){
      query = query[0].UserID
    } else query = null
    return query
}