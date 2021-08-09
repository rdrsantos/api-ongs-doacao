const db = require('../database');
const bcrypt = require('bcrypt');
class User {
  async all(){
    try {
      const user = await db('users').select(['id', 'name', 'email']);
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

  async delete(id){
    const user = await this.findById(id);
    if(user){
      try {
        await db('users').del().where({id});
        return {status: true, message: 'Usuario deletado com sucesso!'}
      } catch (error) {
        console.log(error);
        return {status: false, err: error}
      }
    }else{
      return {status: false, err: 'Usuario não existe'}
    }
  }

  async update(id, name, email){
    const user = await this.findById(id);
    if(user){
      let editUser = {}
      if(email != undefined){
        let emailFiltered = email.trim()
        if(emailFiltered != user.email){
          const emailExists = await this.findEmail(emailFiltered);
          if(!emailExists){
            editUser.email = emailFiltered;
          }else{
            return {err: 'Email invalido ou já existe.'};
          }
        }else{
          return {err: 'O email escolhido já esta cadastrado para essa conta.'};
        }
      }

      if(name != undefined){
        editUser.name = name.trim();
      }

      try {
        await db('users').update(editUser).where({id});
        return {status: true}
      } catch (error) {
        console.log(error)
        return {status: false, err: error}
      }
    }
  }
}

module.exports = new User;