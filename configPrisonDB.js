const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Connecting Database
const config = {
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS
}

const db = mysql.createConnection(config);

db.connect(function(err){
	if(err) throw(err);
	console.log("DB Connection made!");
});

async function runDDL(sql) {
    try {
            await db.execute(sql);
						console.log('Database Configured');
    } catch (err) {
        console.error('Error executing DDL operation', err);
    }
}

//Defining queries
const createPrisonTable = `
    create table ${process.env.DATABASE}.Prison(
	prison_id varchar(45) not null, 
	prison_name text not null,
	address text not null,
	warden text not null,
	primary key(prison_id))
`;

const createCaseTable = `
    create table ${process.env.DATABASE}.\`Case\`(
	case_id varchar(45) not null,
	case_type text not null,
    	case_description text not null,
	primary key(case_id));
`;

const createPrisonerTable = `
    create table ${process.env.DATABASE}.Prisoner(
	prisoner_id varchar(45) not null,
    	prison_id varchar(45) not null,
	prisoner_name text not null,
    	case_id varchar(45) not null,
	date_in date not null,
	date_out date,
	age int not null,
    	address text not null,
	ward_id varchar(45) not null,
	primary key(prisoner_id),
	constraint fk_prison foreign key(prison_id) references ${process.env.DATABASE}.Prison(prison_id),
	constraint fk_case foreign key(case_id) references ${process.env.DATABASE}.\`Case\`(case_id));
`;
const createUsers=`CREATE TABLE ${process.env.DATABASE}.users (
	id INT  AUTO_INCREMENT PRIMARY KEY,
	name varchar(40),
	email varchar(40),
	password varchar(256),
	LastPassChange datetime,
	role varchar(16),
	aadhar int(12)
)`
//Executing the scripts
runDDL(`create database ${process.env.DATABASE};`);
runDDL(createPrisonTable);
runDDL(createCaseTable);
runDDL(createPrisonerTable);
runDDL(createUsers);
//Closing connection
db.end();