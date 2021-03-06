const express = require('express');
const DevController = require('./controllers/DevController');
const LikesController = require('./controllers/LikeController');
const DislikesController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', (req,res) => {
  return res.json({ "Server" : "ON", "Author": req.query.name })
});

// criar um get para devs retornar a info de um user da api do github
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/dev/:devId/likes', LikesController.store);
routes.post('/dev/:devId/dislikes', DislikesController.store);

module.exports = routes;