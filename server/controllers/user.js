const uuid = require('uuid');
import models from '../models';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import request from 'request';
import config from '../config/auth.config';

const now = new Date();
export default class User{
  constructor(){

  }

  static async login(req, res) {
    try{
      if(!req.body){
        console.error('POST .../login failed: no body provided');
        return res.status(400).send({
          message: 'Authentication failed. no body provided'
        });
      }
      const mobileNo = req.body.mobileNo;
      const password = req.body.password;
      if((mobileNo === '' || mobileNo === undefined) || (password === '' || password === undefined)){
        console.error('POST .../login failed: mobileNo or password is required');
        return res.status(400).send({
          message: 'Authentication failed. MobileNo or Password is required'
        });
      }else{
        // Find user details
        const userDetails = await models.users.findOne({
          where:{
            mobileNo: mobileNo
          },
          raw: true
        });
        if(!userDetails || !userDetails.id){
          console.error('POST.../login failed: mobile no not found');
          return res.status(400).send({
            message: 'Invalid mobile no or password'
          });
        }else if(!userDetails.isActive){
          console.error(`POST .../login failed: User status is not active`);
          return res.status(405).send({
            message: 'Authentication failed.',
          });
        }else{
          // Password doesn't match
          if(!bcrypt.compareSync(password, userDetails.hash)){
            console.error("POST.../login failed: password doesn't match");
          return res.status(400).send({
            message: 'Invalid mobile no or password'
          });
          }else{
            // check lastLogin and firstLogin
            await models.sequelize.transaction(async t => {
              if(userDetails.firstLogin === null){
                await models.users.update({
                  firstLogin: true,
                  lastLogin: now
                },
                {
                  returning: true,
                  where: {
                      uid: userDetails.uid
                  },
                  attributes: ['id', 'updated'],
                  transaction: t,
                }
                );
                userDetails.firstLogin = true;
              }else{
                await models.users.update({
                  firstLogin: false,
                  lastLogin: now
                },
                {
                  returning: true,
                  where: {
                      uid: userDetails.uid
                  },
                  attributes: ['id', 'updated'],
                  transaction: t,
                }
                );
              }
            });

            // Password match
            const expiresIn = 24 * 3600; // 24 hours
            const token = jwt.sign(userDetails, config.secret, {
              expiresIn: expiresIn
            });
            res.status(200).send({
              user: userDetails,
              accessToken: token
            });
          }
        }
      }
    }catch(error){
      console.error(`Error on POST .../login failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to login'
      });
    }
  }

  static async addEditUser(req, res){
    try{
      if(!req.body){
        console.error('POST .../signup failed: no body provided');
        return res.status(400).send({
          message: 'User Registration failed. no body provided'
        });
      }

      let creationDocument;
      if(req.body.userId && req.body.userId !== ''){
        creationDocument = {
          name: req.body.name,
          fName: req.body.fName,
          email: req.body.email,
          mobileNo: req.body.mobileNo,
          city: req.body.city,
          role: req.body.role.name,
          dob: req.body.dob,
          address: req.body.address,
          updatedOn: now
        }
        if(req.body.password && req.body.password !== null){
          creationDocument.hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
          creationDocument.passwdLastChanged = now;
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now update the document
          await models.User.update(creationDocument,
            {
              returning: true,
              where: {
                id: req.body.userId
              },
              attributes: ['id'],
              transaction: t,
            }
          );

          if(req.body.role.name === 'Student'){
            //Save student details on table
            let createStudentDocument = {
              fkClassId: req.body.class.id,
              fkStreamId: req.body.stream.id,
              updatedOn: now
            }
            await models.StudentDetails.update(creationDocument,
              {
                returning: true,
                where: {
                  fkUserId: req.body.userId
                },
                attributes: ['id'],
                transaction: t,
              }
            );
          }
          let returnSavedResponse = await models.User.findOne({
            where: {
              id: req.body.userId
            },
            raw: true
          })
          return res.status(200).json(returnSavedResponse);
        });
      }else{

        creationDocument = {
          name: req.body.name,
          fName: req.body.fName,
          email: req.body.email,
          mobileNo: req.body.mobileNo,
          city: req.body.city,
          role: req.body.role.name,
          dob: req.body.dob,
          address: req.body.address,
          hash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
          invalidAttempt: 0,
          isActive: true,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.User.create(creationDocument, {transaction: t});
          const sanitisedResults = creation.get({plain: true});

          if(req.body.role.name === 'Student'){
            //Save student details on table
            let createStudentDocument = {
              fkUserId: sanitisedResults.ID,
              fkClassId: req.body.class.id,
              fkStreamId: req.body.stream.id,
              createdOn: now,
              updatedOn: now
            }
            await models.StudentDetails.create(createStudentDocument, {transaction: t});
          }
          let returnSavedResponse = {
            id: sanitisedResults.ID,
            createdOn: sanitisedResults.createdOn,
            updatedOn: sanitisedResults.updatedOn
          }
          return res.status(200).json(returnSavedResponse);
        });
      }
    }catch(error){
      console.error(`Error on POST .../signup failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to register new user'
      });
    }
  }

  static async getAllUsers(req, res){
    try{
      const usersList = await models.User.findAll({
        where: {
          isActive: true
        }
      });
      if(usersList){
        for(let i = 0; i < usersList.length; i++){
          let userDetails = usersList[i];
          if(userDetails && userDetails.role === 'Student'){
            const studentDetails = await models.StudentDetails.findOne({
              where: {
                fkUserId: userDetails.id
              },
              raw: true
            });
            if(studentDetails){
              userDetails.studentDetails = studentDetails;
            }else{
              userDetails.studentDetails = {};
            }
          }else{
            userDetails.studentDetails = {};
          }
        }
        return res.status(200).json(usersList);
      }
    }catch(error){
      console.error(`Error on GET .../all failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to get all users list'
      });
    }
  }

  static async getUser(req, res){
    try{
      const userDetails = await models.User.findOne({
        where: {
          uid: id
        },
        include: [
          {
            model: models.Class,
            as: 'class'
          },{
            model: models.Stream,
            as: 'stream'
          }
        ]
      });
      if(userDetails && userDetails.role === 'Student'){
        const studentDetails = await models.StudentDetails.findOne({
          where: {
            fkUserId: userDetails.id
          },
          raw: true
        });
        if(studentDetails){
          userDetails.studentDetails = studentDetails;
        }else{
          userDetails.studentDetails = {};
        }
      }else{
        userDetails.studentDetails = {};
      }
      return res.status(200).json(userDetails);
    }catch(error){
      console.error(`Error on GET .../me failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to get user details'
      });
    }
  }

  static async deleteUser(req, res){
    try{
      if(!req.body){
        error('POST .../delete failed: no body provided');
        return res.status(400).send({
          message: 'Delete user failed. no body provided'
        });
      }
      // Delete records in one transaction
      await models.sequelize.transaction(async t => {
        let updationDocument = {
          isActive: 'False',
          updatedOn: now
        }
        await models.User.update(updationDocument,
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
        message: 'Failed to delete user details'
      });
    }
  }
}
