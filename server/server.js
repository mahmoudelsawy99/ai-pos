const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

// Custom login endpoint
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.jsonp({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
      token: 'fake-jwt-token'
    });
  } else {
    res.status(401).jsonp({ message: 'Invalid credentials' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
