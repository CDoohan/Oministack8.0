const Dev = require('../models/Dev');

module.exports = {
  async store(req, res){
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    // Se caso o Dev escolhido para dar Like não existir
    if( !targetDev ){
      return res.status(400).json({ error: 'Dev not exists' })
    }

    // Se caso o Dev escolhido já ter dado Like no Dev
    // atual
    if( targetDev.likes.includes(loggedDev._id) ){
      console.log('Deu match');
    }

    // Se caso o Dev atual já ter dado Like no 
    // Dev escolhido
    if( loggedDev.likes.includes(targetDev._id) ){
      console.log('DEV JÁ EXISTENTE');
      return res.json(loggedDev);
    }
    
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
}