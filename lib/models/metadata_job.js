/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_job', {
    metadata_job_id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metadata_job_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    metadata_job_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metadata_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    metadata_id: {
      type: DataTypes.INTEGER(8),
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
    tableName: 'metadata_job',
    freezeTableName: true
  });
};
