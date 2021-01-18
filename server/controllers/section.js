const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

export default class Section{
  constructor(){

  }

  static async addEditSection(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Section failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.sectionId && req.body.sectionId !== ''){
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          fkStreamId: req.body.stream.id,
          fkSubjectId: req.body.subject.id,
          fkTopicId: req.body.topic.id,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Section.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.sectionId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Section.findOne({
            where: {
              id: req.body.sectionId
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
          fkSubjectId: req.body.subject.id,
          fkTopicId: req.body.topic.id,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Section.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save section details'
      });
    }
  }

  static async getAllSections(req, res) {
    try {
      const sectionsList = await models.Section.findAll({
        where: {
          isActive: 'True'
        },
        order: [['updatedOn', 'DESC']],
        include: [
          {
            model: models.Class,
            as: 'class'
          },{
            model: models.Stream,
            as: 'stream'
          },{
            model: models.Subject,
            as: 'subject'
          },{
            model: models.Topic,
            as: 'topic'
          }
        ]
      });
      if (sectionsList) {
        return res.status(200).json(sectionsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all section list'
      });
    }
  }

  static async getAllSectionList(req, res) {
    try {
      const sectionsList = await models.Section.findAll({
        where: {
          isActive: 'True',
          fkTopicId: req.params.id
        },
        order: [['name', 'ASC']]
      });
      if (sectionsList) {
        return res.status(200).json(sectionsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all sections list'
      });
    }
  }

  static async getSection(req, res) {
    try {
      const sectionDetails = await models.Section.findOne({
        where: {
          isActive: 'True',
          id: req.params.id
        },
        include: [
          {
            model: models.Class,
            as: 'class'
          },{
            model: models.Stream,
            as: 'stream'
          },{
            model: models.Subject,
            as: 'subject'
          },{
            model: models.Topic,
            as: 'topic'
          }
        ]
      });
      if (sectionDetails) {
        return res.status(200).json(sectionDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get section details'
      });
    }
  }

  static async deleteSection(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete section failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Section.update(updationDocument,
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
        message: 'Failed to delete section details'
      });
    }
  }
}
