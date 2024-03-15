const db = require('./prisonrecord/db.js');

async function runDDL(sql, isAdmin = false) {
    try {
        if (isAdmin) {
            await db.execute(sql);
            console.log('DDL operation executed successfully.');
        } else {
            console.log('Only admins can execute this DDL operation.');
        }
    } catch (err) {
        console.error('Error executing DDL operation', err);
    }
}


const createPrisonTable = `
    create table Prison(
	prison_id varchar(45) not null, 
	prison_name text not null,
	address text not null,
	warden text not null,
	primary key(prison_id))
`;

const createCaseTable = `
    create table \`Case\`(
	case_id varchar(45) not null,
	case_type text not null,
    	case_description text not null,
	primary key(case_id));
`;

const createPrisonerTable = `
    create table Prisoner(
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
	constraint fk_prison foreign key(prison_id) references Prison(prison_id),
	constraint fk_case foreign key(case_id) references \`Case\`(case_id));
`;

const alterTable = `
    
`;

const dropPrisonTable = `
    DROP TABLE IF EXISTS prison
`;

const dropPrisonerTable = `
    DROP TABLE IF EXISTS prisoner
`;

const dropCaseTableStatement = `
    DROP TABLE IF EXISTS \`case\`
`;


runDDL(createPrisonTable);
runDDL(createPrisonerTable);
runDDL(createCaseTable);
runDDL(alterTable, isAdmin);
runDDL(dropTable, isAdmin);
