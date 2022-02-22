const passport= require('passport');
const {Strategy} = require('passport-local');
const {User} = require('../models');
const md5 = require('md5');

async function authenticate(username, password, done) {
    const user = await User.findOne({
        where:{
            email:username
        }
    });
    if(!user || md5(password) !== user.password){
        return done(null,false, {message: 'Incorrect email or password.'});
    }
    return dont(null,{
        id: user.id,
        username: user.email,
        displayName: user.first_name
    });
}
const validationStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
},
    authenticate);

passport.use(validationStrategy);
