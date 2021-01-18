module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
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
      field: '"SubjectName"'
    },
    fkClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKClassId"'
    },
    fkStreamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKStreamId"'
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
    table: '"Subject"',
    createdAt: false,
    updatedAt: false

  });
  Subject.associate = (models) => {
    Subject.belongsTo(models.Class, {
      foreignKey: 'fkClassId',
      targetKey: 'id',
      as: 'class'
    });
    Subject.belongsTo(models.Stream, {
      foreignKey: 'fkStreamId',
      targetKey: 'id',
      as: 'stream'
    });
  };
  return Subject;
};
