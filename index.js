const express = require('express');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const blogPostController = require('./controllers/blogPostController');

const app = express();
app.use(express.json());

app.use('/login', loginController);
app.use('/user', usersController);
app.use('/post', blogPostController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Hashirama ouvindo porta: ${PORT}`));
