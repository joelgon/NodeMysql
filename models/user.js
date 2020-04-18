module.exports = (sequelize, type) => {
    const User  = sequelize.define('user', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: type.STRING,
        Email: {
            type: type.STRING,
            unique: true
        },
        Password: {
            type: type.STRING,
            allownull: false,
            select: false
        }
    })
    return User
}