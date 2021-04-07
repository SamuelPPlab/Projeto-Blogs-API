const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginControler');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
