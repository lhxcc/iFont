/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_column', {
    metadata_column_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metadata_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    metadata_column_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    metadata_column_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metadata_column_state: {
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
    },
    source_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_column_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    source_column_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_column_index: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'metadata_column',
    freezeTableName: true
  });
};
