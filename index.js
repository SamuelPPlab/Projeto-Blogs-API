const express = require('express');

// const bodyParser = require('body-parser');

const UsersController = require('./controllers/UsersController');

const app = express();

app.use(express.json());
app.use('/user', UsersController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
