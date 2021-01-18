module.exports = (sequelize, DataTypes) => {
  const Stream = sequelize.define('Stream', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: '"ID"'
    },
    name : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"StreamName"'
    },
    fkClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKClassId"'
    },
    isActive: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["True", "False"],
      defaultValue: "True",
      field: '"IsActive"'
    },
    createdOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: '"CreatedOn"'
    },
    updatedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: '"UpdatedOn"'
    },
  }, {
    table: '"Stream"',
    createdAt: false,
    updatedAt: false

  });
  Stream.associate = (models) => {
    Stream.belongsTo(models.Class, {
      foreignKey: 'fkClassId',
      targetKey: 'id',
      as: 'class'
    });
  };
  return Stream;
};
