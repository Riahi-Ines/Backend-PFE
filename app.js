const express = require('express')
require('./db/config')
require('./db/baseABB')
require('./db/baseHONEYWELL')
const user =require('./models/user')
const userController =require('./controllers/usercontroller')
const ABBRouter = require('./router/ABBRouter')
const HONEYWELLRouter = require('./router/HONEYWELLRouter')
const resetPasswordRouter = require('./router/resetPasswordRouter')


const app = express()
app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/user',userController)
app.use('/reset',resetPasswordRouter);
app.use('/ABB',ABBRouter);
app.use('/HONEYWELL',HONEYWELLRouter);
app.get('/', (req, res) => {
    res.status(200).send("Welcome to the server")
})
async function CreateTable() {
  await user.sync({ alter: false});
}
CreateTable()

app.listen(3000, () => {
  console.log('server start')
})