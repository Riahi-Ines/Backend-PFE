const catchAsync = require("../catchAsync");
const nodemailer = require("nodemailer");
const User = require('../models/user')
var async = require('async');
const bcrypt = require('bcrypt');

exports.resetPassword = catchAsync(async (req, res, next) => {


  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  var x = makeid(10)
  console.log(x)

  try {
    let email = req.body.email;

    let user = await User.findOne({where:{email:email}})

    if (!user) {
        res.status(404).send({ message: "user cannot found" })
    }
    else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(x, salt, function (err, hash) {
      
       User.findOne({ where: { email:req.body.email } }).then(project=>{
        if (project) {
          project.update({
            password: hash
          })
        }
       })
        })
        })
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "ines556riahi@gmail.com",
            pass: "lastblood2020"
          }
        });
        var mailOptions = {
          from: 'ines556riahi@gmail.com',
          to: req.body.email,
          subject: ' Mail De Bienvenue',
          html: "<br> <p> We wanted to let you know that your ProdAst password was reset.  <B> <br><p> The new  pssword is  :<p> " + " " + x
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({
          message: "check your email for new password ",
        });
    }
} catch (error) {
    res.status(400).send({ message: 'API failed', error })
}
  


})
