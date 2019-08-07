const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

  async store(req,res){

    const { username } = req.body;

    const userExist = await Dev.findOne({ user: username })

    if(userExist){
      return res.json(userExist);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`)

    const { name, login: user, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar
    })
    
    return res.json(dev);
  },

  async index(req,res){

    const { user } = req.headers;
    console.log(user);
    const loggedDev = await Dev.findById(user);

    const Devs = await Dev.find({
      // Procure todos os Devs que:
      $and:[
        { _id: { $ne: user } },// Não tenham o id do meu usuário da req
        { _id: { $nin: loggedDev.likes } },// Não estejam dentro do Array de Likes do Usuario da req
        { _id: { $nin: loggedDev.dislikes } }// Não estejam dentro do Array de Dislikes do Usuario da req
      ]
    })

    // $ne => Não seja igual a 
    // $nin => Não esteja dentro(Array)

    return res.json(Devs);

  }
}