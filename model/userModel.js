const db = require('../db');

class User{
  constructor(name, email, password, aadhar, role='public'){
    this.name = name;
    this.email = email;
    this.password = password;
    if(aadhar) this.aadhar = aadhar;
    this.role = role;
  }

  static async findAll(){
    // try{
      const result = await db.execute(`SELECT * from users`);
      return result[0];
    // }
    // catch(err){
    //   console.log(err);
    // }
  }

  static async findOneByEmail(email){
    const result = await db.execute(`SELECT * FROM users where email = ?`, [email]);
    return result[0];
  }

  static async findOne(id){
    const result = await db.execute(`SELECT * FROM users where id = ?`, [id]);
    return result[0];
  }
  async save(){
    if(this.aadhar){
      await db.execute(`INSERT INTO users(name,email,password,aadhar,role) values('${this.name}', '${this.email}', '${this.password}', '${this.aadhar}', '${this.role}')`);
    }
    else{
      await db.execute(`INSERT INTO users(name,email,password,role) values('${this.name}', '${this.email}', '${this.password}', '${this.role}')`);
    }
  }

  static async update(id, newUser){
    await db.execute(`UPDATE users SET name = ?, email = ?, password = ?, aadhar = ?, role = ? where id = ?`, [newUser.name,newUser.email,newUser.password,newUser.aadhar,newUser.role,id]);
  }
}

module.exports = User;