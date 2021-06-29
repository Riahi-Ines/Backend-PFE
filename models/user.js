const connection = require('../db/config')

const User = connection.sequelize.define('User', {
    firstname: {
        type: connection.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: connection.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: connection.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    photo: {
        type: connection.DataTypes.STRING,
        //allowNull: false,

    },
    service: {
        type: connection.DataTypes.STRING,
        allowNull: false,
    },
    post: {
        type: connection.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: connection.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: connection.DataTypes.STRING,
        defaultValue: 'user'
    }

}, {
    connection,
    tableName: 'Users',
    modelName: 'User',
    timestamps: false,
    freezeTableName: true,

});

module.exports = User;