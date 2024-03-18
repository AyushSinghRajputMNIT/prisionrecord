const db = require('../db');

class Case{
  constructor({case_id, case_type, case_description}){
    this.case_id = case_id;
    this.case_type = case_type;
    this.case_description = case_description;
  }

  static async findAll(){
    const result = await db.execute(`SELECT * FROM \`case\``);
    return result[0];
  }

  static async findOne(id){
    const result = await db.execute(`SELECT * FROM \`case\` where case_id = ?`, [id]);
    return result[0];
  }

  async save(){
    await db.execute(`INSERT INTO \`case\` values(?, ?, ?)`, [this.case_id, this.case_type, this.case_description]);
  }

  async update(){
    await db.execute(`UPDATE \`case\` set case_type = ?, case_description = ? where case_id = ?`, [this.case_type, this.case_description, this.case_id]);
  }
};

module.exports = Case