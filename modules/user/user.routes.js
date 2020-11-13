const express = require('express'),
  router = express.Router(),
  UserController = require('./controllers/userController');

module.exports = (app) => {
  router.post('/register', UserController.register);
  router.post('/register-redis', UserController.setRedis);
  router.get('/register-redis/:email', UserController.getRedis);
  
  
  app.use('/api', router);
};
