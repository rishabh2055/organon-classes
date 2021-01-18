module.exports = (sequelize, DataTypes) => {
    const Section = sequelize.define('Section', {
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
        field: '"SectionName"'
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
      table: '"Section"',
      createdAt: false,
      updatedAt: false

    });
    Section.associate = (models) => {
        Section.belongsTo(models.Class, {
        foreignKey: 'fkClassId',
        targetKey: 'id',
        as: 'class'
      });
      Section.belongsTo(models.Stream, {
        foreignKey: 'fkStreamId',
        targetKey: 'id',
        as: 'stream'
      });
      Section.belongsTo(models.Subject, {
        foreignKey: 'fkSubjectId',
        targetKey: 'id',
        as: 'subject'
      });
      Section.belongsTo(models.Topic, {
        foreignKey: 'fkTopicId',
        targetKey: 'id',
        as: 'topic'
      });
    };
    return Section;
  };
