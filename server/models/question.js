module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: '"ID"'
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
    fkTopicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKTopicId"'
    },
    fkSectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"FKSectionId"'
    },
    image : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"QuestionImage"'
    },
    video : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"VideoLink"'
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
    table: '"Question"',
    createdAt: false,
    updatedAt: false

  });
  Question.associate = (models) => {
    Question.belongsTo(models.Class, {
      foreignKey: 'fkClassId',
      targetKey: 'id',
      as: 'class'
    });
    Question.belongsTo(models.Stream, {
      foreignKey: 'fkStreamId',
      targetKey: 'id',
      as: 'stream'
    });
    Question.belongsTo(models.Subject, {
      foreignKey: 'fkSubjectId',
      targetKey: 'id',
      as: 'subject'
    });
    Question.belongsTo(models.Topic, {
      foreignKey: 'fkTopicId',
      targetKey: 'id',
      as: 'topic'
    });
    Question.belongsTo(models.Section, {
      foreignKey: 'fkSectionId',
      targetKey: 'id',
      as: 'section'
    });
  };
  return Question;
};
