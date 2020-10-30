'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const SequelizeModel = require('./src/Sequelize');
const Controller = require('./src/controllers');

const PORT = 8000;
const HOST = '0.0.0.0';
const CLIENT_BUILD_PATH = path.join(__dirname, '../client/build');

(async ()=>{
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(express.static(CLIENT_BUILD_PATH));

  const sequelize = new SequelizeModel();
  await sequelize.connect();

  const controller = new Controller(sequelize.database, {});

  app.post('/generate', (req, res)=>{
    controller.generateData(req, res);
  });

  app.post('/delete', (req, res)=>{
    controller.deleteData(req, res);
  })

  app.post('/reset', (req, res)=>{
    controller.resetData(req, res);
  })
  
  app.post('/expire', (req, res)=>{
    controller.expireData(req, res);
  })

  app.get('/counts', (req, res)=>{
    controller.getCountsByActiveInd(req, res);
  })

  app.get('/data', async (req, res)=>{
    try{
      const result = await controller.getList(req, 'data', {});
      const count = await controller.getCountAll(req, res);
      console.log("count : ", count);
      res.send({data: result, count: count});
    }catch(err){
      res.send({error: err.message});
    }    
  });

  app.get('*', (req, res)=>{
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  })

  app.listen(PORT, HOST);
})()

