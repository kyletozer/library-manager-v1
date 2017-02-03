module.exports = function(connection, Sequelize) {
  return connection.define('patron', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    library_id: Sequelize.STRING,
    zip_code: Sequelize.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.loan, { foreignKey: 'patron_id' });
      }
    }
  });
}
