var Sequelize = require('sequelize');

function ExerciseModel(sequelize) {

    var Exercise = sequelize.define('exercise', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Exercise.sync();
    
    return Exercise;
}

module.exports = ExerciseModel;