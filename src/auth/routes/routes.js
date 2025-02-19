'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require("../middleware/acl.js");


authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.put('/updateAccount', bearerAuth, async (req, res, next) => {
  const id = req.userId
  let userRecord = await users.findOne({ where: { id: id } })

  const output = req.body
  output.token = userRecord.token
  const updateRecored = await userRecord.update(output);
  res.send(updateRecored);

});

authRouter.delete('/deleteAccount', bearerAuth, async (req, res, next) => {
  const id = req.userId

  await users.destroy({ where: { id: id } })
  
  res.send('Account Deleted');

});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

module.exports = authRouter;