const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controller/userController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Listening port 3000!'));

app.use('/user', userRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
