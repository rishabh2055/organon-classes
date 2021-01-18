const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

export default class Classes{
  constructor(){

  }

  static async addEditClass(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Class failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.classId && req.body.classId !== ''){
        creationDocument = {
          name: req.body.name,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Class.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.classId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Class.findOne({
            where: {
              id: req.body.classId
            },
            raw: true
          })
          return res.status(200).json(returnSavedResponse);
        });
      }else{
        creationDocument = {
          name: req.body.name,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Class.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save class details'
      });
    }
  }

  static async getAllClasses(req, res) {
    try {
      const classesList = await models.Class.findAll({
        where: {
          isActive: 'True'
        },
        order: [['updatedOn', 'DESC']],
        raw: true
      });
      if (classesList) {
        return res.status(200).json({classes: classesList});
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all class list'
      });
    }
  }

  static async getClass(req, res) {
    try {
      const classDetails = await models.Class.findOne({
        where: {
          isActive: 'True',
          id: req.params.id
        }
      });
      if (classDetails) {
        return res.status(200).json(classDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get class details'
      });
    }
  }

  static async deleteClass(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete Class failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Class.update(updationDocument,
          {
            returning: true,
            where: {
              id: req.params.id
            },
            attributes: ['id'],
            transaction: t,
          }
        );
        const returnSavedResponse = {
          id: req.params.id,
          updatedOn: now
        }
        return res.status(200).json(returnSavedResponse);
      });
    }catch(err){
      error(`Error on POST .../delete failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to delete class details'
      });
    }
  }
}
