module.exports = function(connection, Sequelize) {
  return connection.define('loan', {
    book_id: Sequelize.INTEGER,
    patron_id: Sequelize.INTEGER,
    loaned_on: Sequelize.DATE,
    return_by: Sequelize.DATE,
    returned_on: Sequelize.DATE
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.book, { foreignKey: 'book_id'});
        this.belongsTo(models.patron, { foreignKey: 'patron_id'});
      }
    }
  });
}
