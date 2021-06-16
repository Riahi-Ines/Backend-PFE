const catchAsync = require('../catchAsync')
const sql = require('mssql')
const { sqlConfig } = require('../db/baseABB')


/****************************** Liste TypeTest*****************************/
exports.getListetypeTest = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var x = `select TypeTest from Test 
  where DateDebut BETWEEN CONVERT(DATETIME, '`+ t + `', 102) AND CONVERT(DATETIME, '`+ t2 + `', 102)
  Group By TypeTest`
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig)
    const result = await sql.query(x)
    res.status(200).send(result)
    //console.dir(result)
  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }

})

/****************************** Liste MachineListe *****************************/
exports.getlisteMachineABB = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var x = `select Id_Machine from Test 
  where DateDebut BETWEEN CONVERT(DATETIME, '`+ t + `', 102) AND CONVERT(DATETIME, '`+ t2 + `', 102)
  Group By Id_Machine`
  try {
    await sql.connect(sqlConfig)
    const liste = await sql.query(x)
    res.status(200).send(liste)
  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }

})

/****************************** Liste TOP 5 Défauts *****************************/
exports.getTopCinqDefaut = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var x = `SELECT TOP (5)  Mesures.Nom_Mesure, count(*) FROM  Mesures INNER JOIN Test ON Mesures.Id_Test = Test.Id
  WHERE (Test.DateDebut BETWEEN CONVERT(DATETIME,'`+ t + `', 102) AND CONVERT(DATETIME,'` + t2 + `', 102)) 
  and TypeTest='`+ t3 + `'
  and Id_Machine='`+ t4 + `'
  and  Mesures.result=0
  group by Mesures.Nom_Mesure
  order by count(nom_mesure)desc`
  try {
    await sql.connect(sqlConfig)
    const liste = await sql.query(x)

    res.status(200).json({
      result: liste.recordsets[0].length,
      data: liste.recordsets
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({

      message: 'request not valide'
    })
  }
})


/****************************** Liste  Défauts *****************************/
exports.getDefaut = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var x = `SELECT Mesures.Nom_Mesure, count(*) FROM  Mesures INNER JOIN Test ON Mesures.Id_Test = Test.Id
  WHERE (Test.DateDebut BETWEEN CONVERT(DATETIME,'`+ t + `', 102) AND CONVERT(DATETIME,'` + t2 + `', 102)) 
  and TypeTest='`+ t3 + `'
  and Id_Machine='`+ t4 + `'
  and  Mesures.result=0
  group by Mesures.Nom_Mesure
  order by count(nom_mesure)desc`
  try {
    await sql.connect(sqlConfig)
    const liste = await sql.query(x)

    res.status(200).json({
      result: liste.recordsets[0].length,
      data: liste.recordsets
    })
  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})



/****************************** First Pass Products *****************************/
exports.getFirstProd = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var x = `SELECT count(*)'1er passage' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+ t3 + `'
  and Id_Machine='`+ t4 + `'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+ t + `', 102) AND CONVERT(DATETIME, '` + t2 + `', 102)
  and Result =1
  Group By Num_Serie
  Having count(Num_Serie)=1)`
  try {
    await sql.connect(sqlConfig)
    const firstpass = await sql.query(x)


    res.status(200).send(firstpass)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})



/****************************** Bad Products *****************************/
exports.getBadProd = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var x = `SELECT count(*)'total' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  and Result=0
  Group By Num_Serie
  
     )                     
   `
  try {
    await sql.connect(sqlConfig)
    const firstpass = await sql.query(x)

    res.status(200).send(firstpass)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})


/******************************Total Products *****************************/
exports.getTotalProd = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var x = `SELECT count(*)'total' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  Group By Num_Serie) `
  try {
    await sql.connect(sqlConfig)
    const totalpass = await sql.query(x)

    res.status(200).send(totalpass)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})


