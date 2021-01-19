module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      field: '"UserName"'
    },
    fName : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"FatherName"'
    },
    email : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"Email"'
    },
    dob : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"DOB"'
    },
    role : {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Admin", "Student"],
      field: '"Role"'
    },
    mobileNo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"MobileNo"'
    },
    invalidAttempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: '"InvalidAttempt"'
    },
    firstLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: '"FirstLogin'
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "Hash"
    },
    passwdLastChanged: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: '"PasswdLastChanged'
    },
    city : {
      type: DataTypes.TEXT,
      allowNull: false,
      field: '"City"'
    },
    address : {
      type: DataTypes.TEXT,
      allowNull: true,
      field: '"Address"'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: '"LastLoggedIn"'
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
    table: '"User"',
    createdAt: false,
    updatedAt: false

  });
  return User;
};
