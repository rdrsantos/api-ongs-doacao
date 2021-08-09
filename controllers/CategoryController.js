const Category = require('../models/Category');
const Helpers = require('../helpers');
class CategoryController {
  async index(req, res){
    try {
      const categories = await Category.all();
      res.json(categories);
    } catch (error) {
      res.status(406)
      res.json({err: error});
    }
  }

  async new(req, res){
    const {title} = req.body;
    if(title == undefined || !title.trim()){
      res.status(400);
      res.json({err: 'O campo nome é obrigatorio'});
      return;
    }
    let titleFiltered = Helpers.firstLetterUppercase(title);

    const titleExists = await Category.findTitle(titleFiltered);
    if(titleExists){
      res.status(400);
      res.json({err: 'Categoria já existe'});
      return;
    }

    await Category.new(titleFiltered);
    res.status(200);
    res.json({message: 'Categoria cadastrada com sucesso'});
  }

  async update(req, res){
    const {id, title} = req.body;
    if(id != undefined){
      const titleFiltered = Helpers.firstLetterUppercase(title);
      const titleExists = await Category.findTitle(titleFiltered);
      if(titleExists){
        res.status(400)
        res.json({err: 'Categoria invalida ou já existe'})
      }

      const result = await Category.update(id, titleFiltered);
      if(result.status){
        res.status(200);
        res.json({message: 'Categoria atualizada com sucesso!'});
      }else{
        res.status(406);
        res.json({err: 'Ocorreu um erro com servidor!'});
      }
    }
  }

  async delete(req, res){
    const {id} = req.params;
    if(!isNaN(id)){
      if(id != undefined){
        const result = await Category.delete(id);
        if(result.status){
          res.status(200);
          res.json({message: 'Categoria deletada com sucesso!'});
        }else{
          res.status(200);
          res.json({err: result.err});
        }
      }else{
        res.sendStatus(400);
      }
    }else{
      res.sendStatus(400);
    }

  }
}

module.exports = new CategoryController;