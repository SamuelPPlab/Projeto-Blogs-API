const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const userController = require('./controllers/users');

const loginRouter = require('./controllers/login');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ---------------------------------------------------------

app.use('/user', userController);

app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
