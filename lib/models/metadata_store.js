/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_store', {
    metadata_store_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metadata_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    source_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    store_parameter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    store_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'metadata_store',
    freezeTableName: true
  });
};
