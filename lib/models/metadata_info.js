/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_info', {
    metadata_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metadata_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    metadata_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'metadata_info',
    freezeTableName: true
  });
};
