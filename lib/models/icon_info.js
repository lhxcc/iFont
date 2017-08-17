/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('icon_info', {
    id: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    show_svg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'icon_info',
    freezeTableName: true
  });
};
