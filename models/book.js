module.exports = function(connection, Sequelize) {
  return connection.define('Book', {
    timestamps: false,
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    first_published: Sequelize.INTEGER
  });
}
