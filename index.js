const express = require('express');

const app = express();
app.use(express.json());

const userController = require('./controllers/userController');
const blogpostController = require('./controllers/blogpostController');
const loginController = require('./controllers/loginController');

app.use('/user', userController);
app.use('/post', blogpostController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
