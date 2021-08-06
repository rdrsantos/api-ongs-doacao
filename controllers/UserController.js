const User = require('../models/User');
class UserController{
  async index(req, res){
    try {
      const users = await User.all();
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  }

  async new(req, res){
    const {name, email, password} = req.body;
    const [nameFiltered, emailFfiltered, passwordFiltered] = [name.trim(), email.trim(), password.trim()]

    if(name == undefined || !nameFiltered){
      res.status(400);
      res.json({err: 'O campo nome é obrigatorio'});
      return;
    }
    if(email == undefined || !emailFfiltered){
      res.status(400);
      res.json({err: 'O campo email é obrigatorio'});
      return;
    }
    if(password == undefined || !passwordFiltered){
      res.status(400);
      res.json({err: 'O campo senha é obrigatorio'});
      return;
    }

    const emailExists = await User.findEmail(emailFfiltered)
    if(emailExists){
      res.status(400)
      res.json({err: 'Email invalido ou já existe', msg: emailExists.length});
      return;
    }

    await User.new(nameFiltered,emailFfiltered,passwordFiltered);
    res.status(200);
    res.json({message: 'Usuario cadastrado com sucesso'});
  }

  async findById(req, res){
    const {id} = req.params;
    if(isNaN(id)){
      res.sendStatus(400);
      return
    }
    if(id != undefined){
      try {
        const user = await User.findById(id);
        if(user){
          res.status(200);
          res.json(user);
        }else{
          res.status(404);
          res.json({err: 'Usuario não existe'});
          return;
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      res.sendStatus(400);
    }
  }
}

module.exports = new UserController();