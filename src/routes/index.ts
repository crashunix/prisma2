import express = require('express');
const routes = express.Router();

const users = require('../controllers/users');
const posts = require('../controllers/posts');

//Users
routes.get('/users', users.index);
routes.get('/users/:id', users.show);
routes.post('/users', users.store);
routes.put('/users/:id', users.update);
routes.delete('/users/:id', users.delete);

//Users
routes.get('/posts', posts.index);
routes.get('/posts/:id', posts.show);
routes.post('/posts', posts.store);
routes.put('/posts/:id', posts.update);
routes.delete('/posts/:id', posts.delete);

module.exports = routes;