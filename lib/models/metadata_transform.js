/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_transform', {
    metadata_transform_id: {
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
    transform_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transform_logic: {
      type: DataTypes.TEXT,
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
    tableName: 'metadata_transform',
    freezeTableName: true
  });
};
