const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

export default class Subject{
  constructor(){

  }

  static async addEditSubject(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Subject failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.subjectId && req.body.subjectId !== ''){
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          fkStreamId: req.body.stream.id,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Subject.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.subjectId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Subject.findOne({
            where: {
              id: req.body.subjectId
            },
            raw: true
          })
          return res.status(200).json(returnSavedResponse);
        });
      }else{
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          fkStreamId: req.body.stream.id,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Subject.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save subject details'
      });
    }
  }

  static async getAllSubjects(req, res) {
    try {
      const subjectsList = await models.Subject.findAll({
        where: {
          isActive: 'True'
        },
        order: [['updatedOn', 'DESC']],
        include: [
          {
            model: models.Class,
            where: {
              isActive: 'True'
            },
            as: 'class'
          },{
            model: models.Stream,
            where: {
              isActive: 'True'
            },
            as: 'stream'
          }
        ]
      });
      if (subjectsList) {
        return res.status(200).json(subjectsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all subject list'
      });
    }
  }

  static async getAllSubjectList(req, res) {
    try {
      const subjectsList = await models.Subject.findAll({
        where: {
          isActive: 'True',
          fkStreamId: req.params.id
        },
        order: [['name', 'ASC']]
      });
      if (subjectsList) {
        return res.status(200).json(subjectsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all subjects list'
      });
    }
  }

  static async getSubject(req, res) {
    try {
      const subjectDetails = await models.Subject.findOne({
        where: {
          isActive: 'True',
          id: req.params.id
        },
        include: [
          {
            model: models.Class,
            where: {
              isActive: 'True'
            },
            as: 'class'
          },{
            model: models.Stream,
            where: {
              isActive: 'True'
            },
            as: 'stream'
          }
        ]
      });
      if (subjectDetails) {
        return res.status(200).json(subjectDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get subject details'
      });
    }
  }

  static async deleteSubject(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete subject failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Subject.update(updationDocument,
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
        message: 'Failed to delete subject details'
      });
    }
  }
}
