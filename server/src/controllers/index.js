const sequelize = require('sequelize');
class BaseController {
  constructor(database, options) {
		this.limit = 20;
    this.options = options;
    this.database = database;
  }
  
  async getList(req, modelName, options){
    const page = req.query.page;
    let result = [];
    try{
      if(page != null && !isNaN(page)){
        if(page > 0){
          options = {...options, offset: ((page-1) * this.limit), limit: this.limit};
        }       
      }
      result = await this.database.models[modelName].findAll(options);
    }catch(err){
      return Promise.reject(err);
    }

    return result;
  }

  async getById(req, modelName){
    const {id} = req.query.params;
    let result = [];
    try{
      result = await this.database.models[modelName].findAll(id);
    }catch(err){
      return Promise.reject(err);
    }

    return result;
  }

  async generateData(req, res){
    try{
      let data = [];
      console.log("this ", this);
      for(var i = 0; i < 10000; i++){
        const active = Math.floor((Math.random() * 2));
        data.push({
            field1: Math.random().toString(36).slice(-8), 
            field2: Math.random().toString(36).slice(-8),
            field3: Math.random().toString(36).slice(-8),
            field4: Math.random().toString(36).slice(-8),
            field5: Math.random().toString(36).slice(-8),
            field6: Math.random().toString(36).slice(-8),
            field7: Math.random().toString(36).slice(-8),
            field8: Math.random().toString(36).slice(-8),
            field9: Math.random().toString(36).slice(-8),
            field10: Math.random().toString(36).slice(-8),
            activeInd: active === 0 ? 'N' : 'Y'
          })
      }

      const result = await this.database.models['data'].bulkCreate(data, {returning: false});
      console.log(result);
      res.send(true)
    }catch(err){
      console.log(err);
      res.send({error: err.message})
    }
  }

  async resetData(req, res){
    try{
      await this.database.models['data'].destroy({where: {}});
      res.send(true)
    }catch(err){
      console.log(err);
      res.send({error: err.message});
    }
  }

  async deleteData(req, res){
    try{
      await this.database.models['data'].update({ activeInd : 'N', expiryOn: new Date() },{ where : { activeInd : 'Y' }}); 
      res.send(true)
    }catch(err){
      console.log(err);
      res.send({error: err.message});
    }
  }

  async expireData(req, res){
    try{
      await this.database.models['data'].update({ expiryOn: new Date() },{ where : { activeInd : 'Y' }}); 
      res.send(true)
    }catch(err){
      console.log(err);
      res.send({error: err.message});
    }
  }

  async getCountsByActiveInd(req, res){
    try{
      const result = await this.database.models['data'].count({
          group: ['activeInd'],
          attributes: ['activeInd']
        });
      res.send(result);
    }catch(err){
      res.send({error: err.message});
    }
  }

  async getCountAll(){
    try{
      const result = await this.database.models['data'].count({
          attributes: ['id']
        });
      return result;
    }catch(err){
      Promise.reject(err)
    }
  }
}


module.exports = BaseController; 