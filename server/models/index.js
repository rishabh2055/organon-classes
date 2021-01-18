import {Sequelize} from 'sequelize';
import fs from 'fs';
import path from 'path';
import { DB } from '../config/db.config'
const basename = path.basename(__filename);

const sequelize = new Sequelize(DB.DB, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.dialect,
  operatorsAlisas: false,
  pool: {
    max: DB.pool.max,
    min: DB.pool.min,
    acquire: DB.pool.acquire,
    idle: DB.pool.idle,
  }
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    if(file !== 'index.js'){
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
