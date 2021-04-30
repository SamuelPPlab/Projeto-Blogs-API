const { BlogPost } = require('../models');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.data.id;
  try {
    const post = await BlogPost.create({
      title, content, userId,
    });
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: 'user',
    });
    if (posts === null) {
      return res.status(404).json({ message: 'Nada a retornar' });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  createPost,
  getAll,
};
