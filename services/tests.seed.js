const fs = require('fs')
const num = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var tests = []

const mongoose = require('mongoose')

// users seed
var t = 0
do {
  let random = num.sort(function () { return 0.5 - Math.random() })
  let correctas = random[0]
  let incorrectas = 20 - correctas
  let nota = ""
  if( incorrectas > correctas){ nota = "Suspendido"}
  if( correctas >= incorrectas){nota= "Aprobado"}



  tests.push({
    user_id: mongoose.Types.ObjectId("5df3abab1001f4e71b2a2695"),
    title: `Test Teoría ${t}`,
    aciertos_num: correctas,
    fallos_num: incorrectas,
    nota: nota
  })

  t += 1
} while (t < 10)
console.log(tests[0])
console.log(tests.length)

const data2 = JSON.stringify(tests)
fs.writeFileSync('tests.json', data2)

mongoimport --uri "mongodb+srv://jose:evangelion01@prueba-jw00s.mongodb.net/test?retryWrites=true&w=majority" --db test --collection users --file users.json --jsonArray
mongoimport --uri "mongodb+srv://jose:evangelion01@prueba-jw00s.mongodb.net/test?retryWrites=true&w=majority" --db test --collection questions --file questions.json --jsonArray

mongoimport --db  --collection tests --file tests.json --jsonArray