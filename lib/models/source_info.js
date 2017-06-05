/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('source_info', {
    source_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    source_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_hdfs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_compress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source_state: {
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
    tableName: 'source_info',
    freezeTableName: true
  });
};
