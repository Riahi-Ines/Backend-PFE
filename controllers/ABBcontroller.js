const catchAsync = require('../catchAsync')
const sql = require('mssql')
const { sqlConfig } = require('../db/baseABB')


/****************************** Liste TypeTest*****************************/
exports.getListetypeTest = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var type = `use ABB
  select TypeTest from Test 
  where DateDebut BETWEEN CONVERT(DATETIME, '`+ t + `', 102) AND CONVERT(DATETIME, '`+ t2 + `', 102)
  Group By TypeTest`
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig)
    const listetype = await sql.query(type)
    res.status(200).send(listetype)
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
  var machines = `use ABB
  select Id_Machine from Test 
  where DateDebut BETWEEN CONVERT(DATETIME, '`+ t + `', 102) AND CONVERT(DATETIME, '`+ t2 + `', 102)
  Group By Id_Machine`
  try {
    await sql.connect(sqlConfig)
    const listemachines = await sql.query(machines)
    res.status(200).send(listemachines)
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
  var top5 = `use ABB
  SELECT TOP (5)  Mesures.Nom_Mesure, count(*)'quantite' FROM  Mesures INNER JOIN Test ON Mesures.Id_Test = Test.Id
  WHERE (Test.DateDebut BETWEEN CONVERT(DATETIME,'`+ t + `', 102) AND CONVERT(DATETIME,'` + t2 + `', 102)) 
  and TypeTest='`+ t3 + `'
  and Id_Machine='`+ t4 + `'
  and  Mesures.result=0
  group by Mesures.Nom_Mesure
  order by count(nom_mesure)desc`
  try {
    await sql.connect(sqlConfig)
    const listed5 = await sql.query(top5)

    res.status(200).json({
      result: listed5.recordsets[0].length,
      data: listed5.recordsets
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
  var defauts = `use ABB
  SELECT Mesures.Nom_Mesure, count(*)'quantite' FROM  Mesures INNER JOIN Test ON Mesures.Id_Test = Test.Id
  WHERE (Test.DateDebut BETWEEN CONVERT(DATETIME,'`+ t + `', 102) AND CONVERT(DATETIME,'` + t2 + `', 102)) 
  and TypeTest='`+ t3 + `'
  and Id_Machine='`+ t4 + `'
  and  Mesures.result=0
  group by Mesures.Nom_Mesure
  order by count(nom_mesure)desc`
  try {
    await sql.connect(sqlConfig)
    const listed = await sql.query(defauts)

    res.status(200).json({
      result: listed.recordsets[0].length,
      data: listed.recordsets
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
  var firstpassy = `use ABB
  SELECT count(*)'perpassage' FROM   Test 
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
    const firstpass = await sql.query(firstpassy)


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
  var bad = `use ABB
  SELECT count(*)'total' FROM   Test 
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
    const badpass = await sql.query(bad)

    res.status(200).send(badpass)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})


/****************************** good Products *****************************/
exports.getgoodProd = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var bad = `use ABB
  SELECT count(*)'total' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  and Result=1
  Group By Num_Serie
  
     )                     
   `
  try {
    await sql.connect(sqlConfig)
    const badpass = await sql.query(bad)

    res.status(200).send(badpass)

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
  var total = `use ABB
  SELECT count(*)'total' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  Group By Num_Serie) `
  try {
    await sql.connect(sqlConfig)
    const totalprodabb = await sql.query(total)

    res.status(200).send(totalprodabb)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})


/******************************FPY *****************************/
exports.getFPY = catchAsync(async (req, res, next) => {
  var t = req.body.dateDebut
  var t2 = req.body.dateFint
  var t3 = req.body.TypeTest
  var t4 = req.body.Id_Machine
  var fpy = `use ABB
  select cast(((
  100.0*
  (
  SELECT count(*)'1er passage' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME,'`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  and Result =1
  Group By Num_Serie
  Having count(Num_Serie)=1
     )
  )
  /
  (
   SELECT count(*)'total' FROM   Test 
  where Id IN
  (SELECT MAX(Id) From Test
  where TypeTest='`+t3+`'
  and Id_Machine='`+t4+`'
  and DateDebut BETWEEN CONVERT(DATETIME, '`+t+`', 102) AND CONVERT(DATETIME, '`+t2+`', 102)
  Group By Num_Serie
  
     )       
  )
  )
  ) as decimal (8,2))
        'Result'              
     `
  try {
    await sql.connect(sqlConfig)
    const fpyabb = await sql.query(fpy)

    res.status(200).send(fpyabb)

  } catch (err) {
    res.status(400).send({
      message: 'request not valide'
    })
  }
})