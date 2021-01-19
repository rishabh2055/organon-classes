module.exports = (sequelize, DataTypes) => {
  const StudentDetails = sequelize.define('StudentDetails', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: '"ID"'
    },
    fkUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKUserId"'
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
    table: '"StudentDetails"',
    createdAt: false,
    updatedAt: false

  });
  StudentDetails.associate = (models) => {
    StudentDetails.belongsTo(models.User, {
      foreignKey: 'fkUserId',
      targetKey: 'id',
      as: 'user'
    });
    StudentDetails.belongsTo(models.Class, {
      foreignKey: 'fkClassId',
      targetKey: 'id',
      as: 'class'
    });
    StudentDetails.belongsTo(models.Stream, {
      foreignKey: 'fkStreamId',
      targetKey: 'id',
      as: 'stream'
    });
  };
  return StudentDetails;
};
