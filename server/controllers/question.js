const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

global.questionResponse = {};

export default class Question{
  constructor(){

  }

  static async addEditQuestion(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Question failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.questionId && req.body.questionId !== 'undefined'){
        creationDocument = {
          fkClassId: +req.body.class,
          fkStreamId: +req.body.stream,
          fkSubjectId: +req.body.subject,
          fkTopicId: +req.body.topic,
          fkSectionId: +req.body.section,
          video: req.body.video,
          updatedOn: now
        }
        if(req.file){
          creationDocument.image = req.file.filename;
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Question.update(creationDocument,
            {
              returning: true,
              where: {
                id: +req.body.questionId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Question.findOne({
            where: {
              id: +req.body.questionId
            },
            raw: true
          })
          return res.status(200).json(returnSavedResponse);
        });
      }else{
        if(!req.file){
          error('POST .../add failed: no file provided');
          return res.status(400).send({
            message: 'Add/Edit Question failed. question image not provided'
          });
        }
        creationDocument = {
          fkClassId: +req.body.class,
          fkStreamId: +req.body.stream,
          fkSubjectId: +req.body.subject,
          fkTopicId: +req.body.topic,
          fkSectionId: +req.body.section,
          image: req.file.filename,
          video: req.body.video,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Question.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save question details'
      });
    }
  }

  static async getAllQuestions(req, res) {
    try {
      const questionsList = await models.Question.findAll({
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
          },{
            model: models.Topic,
            where: {
              isActive: 'True'
            },
            as: 'topic'
          },{
            model: models.Section,
            where: {
              isActive: 'True'
            },
            as: 'section'
          }
        ]
      });
      if (questionsList) {
        return res.status(200).json(questionsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all question list'
      });
    }
  }

  static async getAllQuestionList(req, res) {
    try {
      const questionsList = await models.Question.findAll({
        where: {
          isActive: 'True',
          fkTopicId: req.params.id,
          fkSectionId: req.body.sectionId
        },
        order: [['updatedOn', 'DESC']]
      });
      if (questionsList) {
        return res.status(200).json(questionsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all questions list'
      });
    }
  }

  static async getAllQuestionListByClassAndStream(req, res) {
    try {
      const topicsList = await models.Question.findAll({
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

  static async getQuestion(req, res) {
    try {
      const questionDetails = await models.Question.findOne({
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
          },{
            model: models.Topic,
            where: {
              isActive: 'True'
            },
            as: 'topic'
          },{
            model: models.Section,
            where: {
              isActive: 'True'
            },
            as: 'section'
          }
        ]
      });
      if (questionDetails) {
        return res.status(200).json(questionDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get question details'
      });
    }
  }

  static async deleteQuestion(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete question failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Question.update(updationDocument,
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
        message: 'Failed to delete question details'
      });
    }
  }
}
