const db = require('../db');

class Prisoner {
  constructor({
    prisoner_id,
    prison_id,
    prisoner_name,
    case_id,
    date_in,
    date_out,
    age,
    address,
    ward_id,
  }) {
    this.prison_id = prison_id;
    this.prisoner_id = prisoner_id;
    this.prisoner_name = prisoner_name;
    this.case_id = case_id;
    this.date_in = date_in;
    this.date_out = date_out;
    this.age = age;
    this.address = address;
    this.ward_id = ward_id;
  }

  static async findAll() {
    const result = await db.execute(`SELECT * FROM prisoner`);
    return result[0];
  }

  static async findOne(id) {
    const result = await db.execute(
      `SELECT * FROM prisoner where prisoner_id = ?`,
      [id]
    );
    return result[0];
  }

  async save() {
    //Add parameterised query
    await db.execute(
      `INSERT INTO prisoner values('${this.prisoner_id}', '${
        this.prison_id
      }', '${this.prisoner_name}', '${this.case_id}', '${this.date_in}', ${
        this.date_out ? `'${this.date_out}'` : null
      }, '${this.age}', '${this.address}', '${this.ward_id}')`
    );
  }

  async update() {
    //Add parameterised query
    await db.execute(
      `UPDATE prisoner 
       SET prison_id = ?, 
           prisoner_name = ?, 
           case_id = ?, 
           date_in = ?, 
           date_out = ?, 
           age = ?, 
           address = ?, 
           ward_id = ? 
       WHERE prisoner_id = ?`,
      [
        this.prison_id,
        this.prisoner_name,
        this.case_id,
        this.date_in,
        this.date_out,
        this.age,
        this.address,
        this.ward_id,
        this.prisoner_id,
      ]
    );
  }
}

module.exports = Prisoner;
