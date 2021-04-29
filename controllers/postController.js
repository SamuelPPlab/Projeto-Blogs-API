const { Router } = require('express');
const models = require('../models');

const NOT_FOUND = 404;
const CREATED = 201;

const PostRouter = new Router();

PostRouter.post('/', async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;
  try {
    const post = await models.createPost.create({ title, content, userId: id });
    return res.status(CREATED).json(post);
  } catch (err) {
    return res.status(NOT_FOUND).json({ message: err.message });
  }
});

module.exports = PostRouter;
