module.exports = function(connection, Sequelize) {
  return connection.define('Patron', {
    timestamps: false,
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    library_id: Sequelize.STRING,
    zip_code: Sequelize.INTEGER
  });
}
