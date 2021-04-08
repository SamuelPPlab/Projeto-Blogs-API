const express = require('express');

require('dotenv').config();

const usersRouter = require('./users/usersRouter');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
