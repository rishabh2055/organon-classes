module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
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
        field: '"TopicName"'
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
      fkSubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: '"FKSubjectId"'
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
      table: '"Topic"',
      createdAt: false,
      updatedAt: false

    });
    Topic.associate = (models) => {
      Topic.belongsTo(models.Class, {
        foreignKey: 'fkClassId',
        targetKey: 'id',
        as: 'class'
      });
      Topic.belongsTo(models.Stream, {
        foreignKey: 'fkStreamId',
        targetKey: 'id',
        as: 'stream'
      });
      Topic.belongsTo(models.Subject, {
        foreignKey: 'fkSubjectId',
        targetKey: 'id',
        as: 'subject'
      });
    };
    return Topic;
  };
