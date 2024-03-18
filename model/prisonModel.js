const db = require('../db');

class Prison{
  constructor({prison_id, prison_name, address, warden}){
    this.prison_id = prison_id;
    this.prison_name = prison_name;
    this.address = address;
    this.warden = warden; 
  }

  static async findAll(){
    const result = await db.execute(`SELECT * FROM prison`);
    return result[0];
  }

  static async findOne(id){
    const result = await db.execute(`SELECT * FROM prison WHERE prison_id = ?`,[id]);
    return result[0];
  }

  async save(){
    await db.execute(`INSERT INTO prison values(?, ?, ?, ?)`, [this.prison_id, this.prison_name, this.address, this.warden]);
  }
  
  static async delete(id){
    await db.execute(`DELETE FROM prison WHERE prison_id = ?`, [id]);
  }

  async update(){
    await db.execute(`UPDATE prison set prison_name = ?, address = ?, warden = ? WHERE prison_id = ?`, [this.prison_name, this.address, this.warden, this.prison_id]);
  }
};

module.exports = Prison