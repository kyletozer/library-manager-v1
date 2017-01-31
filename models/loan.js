module.exports = function(connection, Sequelize) {
  return connection.define('Loan', {
    timestamps: false,
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    book_id: Sequelize.INTEGER,
    patron_id: Sequelize.INTEGER,
    loaned_on: Sequelize.DATE,
    returned_by: Sequelize.DATE,
    returned_on: Sequelize.DATE
  });
}
