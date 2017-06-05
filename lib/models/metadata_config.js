/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_config', {
    metadata_conf_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    metadata_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    conf_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    conf_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    update_time: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'metadata_config',
    freezeTableName: true
  });
};
