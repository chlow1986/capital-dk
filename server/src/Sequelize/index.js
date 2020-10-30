const { Sequelize, DataTypes } = require('sequelize');

class SequelizeModel {
  constructor() {
    this.database = null;
  }

  async connect(){
    // const sequelize = new Sequelize({
    //   dialect: 'sqlite',
    //   storage: './database.sqlite'
    // });

    const sequelize = new Sequelize('master', 'admin', 'password', {
      host: 'database-dev.cygueefzmtyc.us-east-2.rds.amazonaws.com',
      dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
    /*
      Order Model
      Fields: id, status (N: Created, C: Confirmed, D: Delivered, I: Canceled), remark
     */
    const Data = sequelize.define('data', {
      field1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field5: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field6: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field7: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field8: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field9: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field10: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activeInd: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: 'Y'
      },
      effectiveOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      expiryOn: {
        type: DataTypes.DATE
      }
    }, {
    });

    /* to sync all models to database */
    await sequelize.sync({force: true});

    this.database = sequelize;
  }
}

module.exports = SequelizeModel;
