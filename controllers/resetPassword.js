const catchAsync = require("../catchAsync");
const nodemailer = require("nodemailer");
const User = require('../models/user')
var async = require('async');
const bcrypt = require('bcrypt');
var crypto = require('crypto');

exports.resetPassword = catchAsync(async(req, res, next) => {

    console.log('rrrrrrrrrrrrrrrrr')
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(  token, done) {
           
       const user =   User.findOne({where:{ email: req.body.email} },
         function(err, user) {
                //console.log(user)
            if (!user) {
            //   console.log('error', 'No account with that email address exists.');
            req.flash('error', 'No account with that email address exists.');
              return res.redirect('/reset');
            }
    console.log('step 1')
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
            console.log('dddddddddddddddddddddddddddddd 2')
        
    
          var smtpTrans = nodemailer.createTransport({
             service: 'Gmail', 
             auth: {
              user: 'maintenanceasteel@gmail.com',
              pass: '123456789/p'
            }
          });
          var mailOptions = {
    
            to: user.email,
            from: 'maintenanceasteel@gmail.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    
          };
          console.log('step 3')
    
            smtpTrans.sendMail(mailOptions, function(err) {
            req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            console.log('sent')
           // res.redirect('/forgot');
            res.status(200)
    });
    }
      ], function(err) {
        console.log('this err' + ' ' + err)
        //res.redirect('/');
  
      });

})

