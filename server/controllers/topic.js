const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

export default class Topic{
  constructor(){

  }

  static async addEditTopic(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Topic failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.topicId && req.body.topicId !== ''){
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          fkStreamId: req.body.stream.id,
          fkSubjectId: req.body.subject.id,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Topic.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.topicId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Topic.findOne({
            where: {
              id: req.body.topicId
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
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Topic.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save topic details'
      });
    }
  }

  static async getAllTopics(req, res) {
    try {
      const topicsList = await models.Topic.findAll({
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
          },{
            model: models.Subject,
            where: {
              isActive: 'True'
            },
            as: 'subject'
          }
        ]
      });
      if (topicsList) {
        return res.status(200).json(topicsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all topic list'
      });
    }
  }

  static async getTopic(req, res) {
    try {
      const topicDetails = await models.Topic.findOne({
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
          },{
            model: models.Subject,
            where: {
              isActive: 'True'
            },
            as: 'subject'
          }
        ]
      });
      if (topicDetails) {
        return res.status(200).json(topicDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get topic details'
      });
    }
  }

  static async getAllTopicList(req, res) {
    try {
      const topicsList = await models.Topic.findAll({
        where: {
          isActive: 'True',
          fkSubjectId: req.params.id
        },
        order: [['updatedOn', 'ASC']]
      });
      if (topicsList) {
        return res.status(200).json(topicsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all topics list'
      });
    }
  }

  static async getAllTopicListByClassAndStream(req, res) {
    try {
      const topicsList = await models.Topic.findAll({
        where: {
          isActive: 'True',
          fkClassId: req.body.class.id,
          fkStreamId: req.body.stream.id,
        },
        order: [['updatedOn', 'ASC']]
      });
      if (topicsList) {
        return res.status(200).json(topicsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all topics list'
      });
    }
  }

  static async deleteTopic(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete topic failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Topic.update(updationDocument,
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
        message: 'Failed to delete topic details'
      });
    }
  }
}
