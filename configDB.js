const db = require('./db');
const fs = require('fs');

async function runQ(sql){
  try{
    await db.execute(sql);
  }
  catch(err){
    console.log(err);
  }
}

let rawdata = fs.readFileSync('sql.json');
let sql = JSON.parse(rawdata);
console.log(sql);
