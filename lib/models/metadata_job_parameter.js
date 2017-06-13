/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_job_parameter', {
    metadata_job_parameter_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metadata_job_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    parameter_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parameter_value: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'metadata_job_parameter',
    freezeTableName: true
  });
};