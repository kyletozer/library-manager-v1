module.exports = function(connection, Sequelize) {
  return connection.define('book', {
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    first_published: Sequelize.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.loan, { foreignKey: 'book_id' });
      }
    }
  });
}
