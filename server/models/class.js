module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
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
      field: '"ClassName"'
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
    table: '"Class"',
    createdAt: false,
    updatedAt: false

  });
  return Class;
};
