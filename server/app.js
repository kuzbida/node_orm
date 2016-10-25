var Sequelize = require('sequelize'),
    mysql = require('mysql'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3333;

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


console.log('Its env_____', process.env.ENV);

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var User = require('./models/UserModel')(sequelize);
var Exercise = require('./models/ExerciseModel')(sequelize);

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});


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
