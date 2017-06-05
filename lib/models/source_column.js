/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('source_column', {
    source_column_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    source_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_column_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_column_index: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    source_column_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    update_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'source_column',
    freezeTableName: true
  });
};
