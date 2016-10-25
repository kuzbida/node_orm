var Sequelize = require('sequelize');

function UserModel(sequelize) {
    var User = sequelize.define('user', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
            admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }
    });
    User.sync({force: true}).then(function () {
        // Table created
        return User.create({
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'tdadmin@gmail.com',
            admin: true
        });
    });
    return User;
}

module.exports = UserModel;