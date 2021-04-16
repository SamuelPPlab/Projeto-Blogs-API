module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING },
      content: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Users' }, key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      published: { type: Sequelize.DATE, defaultValue: new Date() },
      updated: { type: Sequelize.DATE, defaultValue: new Date() },
    });

    return BlogPostsTable;
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  },
};