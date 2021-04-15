const { Op } = require('sequelize');
const { BlogPost, User } = require('../models/BlogPost');

async function getAll() {
  const posts = await BlogPost.findAll({
    include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
  });

  return posts;
}

async function findById(id) {
  const post = await BlogPost.findByPk(id, {
    include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
  });

  return post;
}

async function searchByQuerie(searchTerm) {
  const post = await BlogPost.findAll({
    where: [
      { title: { [Op.like]: `%${searchTerm}%` } },

      { content: { [Op.like]: `%${searchTerm}%` } },
    ],
    include: { as: 'user', model: User, attributes: ['id', 'displayName', 'email', 'image'] },
  });

  return post;
}

async function update({ id, ...post }) {
  await BlogPost.update(post, {
    where: { id },
  });

  const BlogPostData = await findById(id);

  return BlogPostData;
}

async function create(data) {
  return BlogPost.create(data);
}

async function deleteById(id) {
  await BlogPost.destroy({ where: { id } });
}

module.exports = {
  getAll, findById, searchByQuerie, update, deleteById, create,
};
