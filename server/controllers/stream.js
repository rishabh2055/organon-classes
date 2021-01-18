const uuid = require('uuid');
import models from '../models';
import { error } from '../logger';

const now = new Date();

export default class Stream{
  constructor(){

  }

  static async addEditStream(req, res){
    try{
      if(!req.body){
        error('POST .../add failed: no body provided');
        return res.status(400).send({
          message: 'Add/Edit Stream failed. no body provided'
        });
      }
      let creationDocument;
      if(req.body.streamId && req.body.streamId !== ''){
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          await models.Stream.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.streamId
              },
              attributes: ['id'],
              transaction: t,
            }
          );


          let returnSavedResponse = await models.Stream.findOne({
            where: {
              id: req.body.streamId
            },
            raw: true
          })
          return res.status(200).json(returnSavedResponse);
        });
      }else{
        creationDocument = {
          name: req.body.name,
          fkClassId: req.body.class.id,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.Stream.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          return res.status(200).json(sanitisedResults);
        });
      }
    }catch(err){
      error(`Error on POST .../add failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to save stream details'
      });
    }
  }

  static async getAllStreams(req, res) {
    try {
      const streamsList = await models.Stream.findAll({
        where: {
          isActive: 'True'
        },
        order: [['updatedOn', 'DESC']],
        include: [
          {
            model: models.Class,
            as: 'class'
          }
        ]
      });
      if (streamsList) {
        return res.status(200).json(streamsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all stream list'
      });
    }
  }

  static async getAllStreamList(req, res) {
    try {
      const streamsList = await models.Stream.findAll({
        where: {
          isActive: 'True',
          fkClassId: req.params.id
        },
        order: [['name', 'ASC']]
      });
      if (streamsList) {
        return res.status(200).json(streamsList);
      }
    } catch (err) {
      error(`Error on GET .../all failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get all streams list'
      });
    }
  }

  static async getStream(req, res) {
    try {
      const streamDetails = await models.Stream.findOne({
        where: {
          isActive: 'True',
          id: req.params.id
        },
        include: [
          {
            model: models.Class,
            as: 'class'
          }
        ]
      });
      if (streamDetails) {
        return res.status(200).json(streamDetails);
      }
    } catch (err) {
      error(`Error on GET .../:id failed: ${err}`);
      return res.status(503).json({
        message: 'Failed to get stream details'
      });
    }
  }

  static async deleteStream(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete Stream failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.Stream.update(updationDocument,
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
        message: 'Failed to delete stream details'
      });
    }
  }
}
