const db = require('../database');
const bcrypt = require('bcrypt');
class User {
  async all(){
    try {
      const user = await db('users').select();
      return user;
    } catch (error) {
      console.log(error);
      return []
    }
  }

  async findById(id){
    try {
      const user = await db('users').select(['id', 'name', 'email']).where({id});
      return user.length ? user[0] : undefined;
    } catch (error) {
      console.log(error);
      return undefined
    }
  }

  async findEmail(email){
    try {
      const result = await db('users').select('id').where({email});
      return result.length ? result[0] : undefined;
    } catch (error) {
      console.log(error)
    }
  }

  async new(name, email, password){
    try {
      const hash = await bcrypt.hash(password, 10);
      await db('users').insert({name, password: hash, email});
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

module.exports = new User;