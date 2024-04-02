const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Connecting Database
const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
};

const db = mysql.createConnection(config);

db.connect(function (err) {
  if (err) throw err;
  console.log('DB Connection made!');
});

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./inputData.json', 'utf-8'));
data[2].data.forEach(async (el) => {
  await db.execute('INSERT INTO `case` values(?,?,?)', [
    el.case_id,
    el.case_type,
    el.case_description,
  ]);
});
data[3].data.forEach(async (el) => {
  await db.execute('INSERT INTO prison values(?,?,?,?)', [
    el.prison_id,
    el.prison_name,
    el.address,
    el.warden,
  ]);
});
data[4].data.forEach(async (el) => {
  el.date_out = el.date_out ? el.date_out : null;
  await db.execute('INSERT INTO prisoner values(?,?,?,?,?,?,?,?,?)', [
    el.prisoner_id,
    el.prison_id,
    el.prisoner_name,
    el.case_id,
    el.date_in,
    el.date_out,
    el.age,
    el.address,
    el.ward_id,
  ]);
});
async function addAdmin() {
  const name = 'admin';
  const email = 'admin@prison.com';
  const password =
    '$2a$12$/VbsAlVo.BbsnPtSGbBzZebFSFnmqGtSxD.WUZrf/4TGM34Nux05e';
  const LastPassChange = null;
  const role = 'admin';
  const aadhar = null;
  await db.execute(
    'INSERT INTO users(name,email,password,LastPassChange,role,aadhar) VALUES(?,?,?,?,?,?)',
    [name, email, password, LastPassChange, role, aadhar]
  );
}
addAdmin();
db.end();
