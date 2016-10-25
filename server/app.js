var Sequelize = require('sequelize'),
    mysql = require('mysql'),
    express = require('express'),
    app = express();

var sequelize = new Sequelize('TrainingDay', 'root', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });



var User = require('./models/UserModel')(sequelize);
var Exercise = require('./models/ExerciseModel')(sequelize);


// var ExerciseType = sequelize.define('exerciseType', {
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.TEXT
//     }
// });
//
// ExerciseType.sync();


/*
User.findAll().then(function(users) {
    console.log(users)
})*/
