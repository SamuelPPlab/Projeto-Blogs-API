const express = require('express');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

app.use('/', userController);
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
