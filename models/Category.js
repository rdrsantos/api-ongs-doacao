const db = require('../database');
class Category {
  async all(){
    try {
      const categories = await db('categories').select();
      return categories; 
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      const category = await db('categories').select().where({id});
      return category.length ? category[0] : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  async findTitle(title) {
    try {
      const category = await db('categories').select().where({title});
      return category.length ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async new(title){
    try {
      await db('categories').insert({title});
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async update(id, title){
    if(id != undefined){
      const category = await this.findById(id);
      if(category){
        if(title == category.title){
          return {err: 'Categoria já esta cadastrada'}
        }
      }

      try {
        await db('categories').update({title}).where({id});
        return {status: true};
      } catch (error) {
        console(error);
        return {status: false, err: error}
      }
    }
  }

  async delete(id){
    if(id != undefined){
      const category = await this.findById(id);
      if(category){
        try {
          await db('categories').del().where({id});
          return {status: true}
        } catch (error) {
          console.log(error);
          return {status: false};
        }
      }else{
        return {status: false, err: 'Usuario não existe'}
      }

    }
  }
}

module.exports = new Category;