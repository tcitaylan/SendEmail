const fs = require('fs');
const os = require('os'); 
const email = require('./email');
const _=require('lodash');
const yargs = require('yargs');



var user = os.userInfo();

fs.appendFile('greet.txt',`  Hi ${user.username} !!`,function (err){
    if(err)
    console.log('Unable to create file!');

});