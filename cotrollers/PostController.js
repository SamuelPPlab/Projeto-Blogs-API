const { Router } = require('express');
const { PostValidate } = require('../middlewares/PostValidate');
const { verifyToken, validateToken } = require('../auth');

const models = require('../models');

const RouterPost = Router();
const Created = 201;
const NotFound = 404;
const Success = 200;
const InternalServerError = 500;
const NotAuthorized = 401;

RouterPost.post('/', validateToken, PostValidate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const token = req.headers.authorization;
    const tokenVerify = verifyToken(token);
    const { id } = tokenVerify;
    const post = await models.BlogPosts.create({ title, content, userId: id });
    return res.status(Created).send(post);
  } catch (err) {
    return res.status(NotFound).json({ message: err.message });
  }
});

RouterPost.get('/', validateToken, async (_req, res) => {
  models.BlogPosts.findAll({
    include: [{
      model: models.User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
    attributes: { exclude: ['userId'] },
  })
    .then((post) => res.status(Success).json(post))
    .catch((err) => res.status(InternalServerError).json({ message: err.message }));
});

RouterPost.get('/:id', validateToken, async (req, res) => {
  try {
    const post = await models.BlogPosts.findAll({
      where: { id: req.params.id },
      include: [{
        model: models.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
      attributes: { exclude: ['userId'] },
    });
    if (post.length > 0) return res.status(Success).json(post[0]);
    return res.status(NotFound).json({ message: 'Post não existe' });
  } catch (err) {
    return res.status(InternalServerError).json({ message: err.message });
  }
});

RouterPost.put('/:id', validateToken, PostValidate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const token = req.headers.authorization;
    const tokenVerify = verifyToken(token);
    const { id } = tokenVerify;
    const updatePost = await models.BlogPosts.findOne({ where: { id } });
    const userId = id;
    if (updatePost.userId !== userId) {
      return res.status(NotAuthorized)
        .json({ message: 'Usuário não autorizado' });
    }
    updatePost.title = title;
    updatePost.content = content;
    await updatePost.save();
    return res.status(Success).json({ title, content, userId });
  } catch (err) {
    return res.status(NotFound).json({ message: err.message });
  }
});

module.exports = RouterPost;
