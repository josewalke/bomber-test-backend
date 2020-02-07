const fs = require('fs')
const difficulty = ["Fácil", "Media", "Dificil"]
const questions = []
const preguntas =  require('./all.questions')




// users seed
let q = preguntas.length
t = 0
do {
  const num = preguntas[t].respuestas.length - 1
  const right = preguntas[t].respuestas[num]
  // let temas = ["5e18b011f0e6026f3ea4c386", "5e18bd1ef0e6026f3ea4c387", "5e1c83e5a0e3ed2874b6b400"].sort(function () { return 0.5 - Math.random() })
  let temas = [{"$oid": "5e18b011f0e6026f3ea4c386"}, {"$oid": "5e18bd1ef0e6026f3ea4c387"}, {"$oid": "5e1c83e5a0e3ed2874b6b400"}].sort(function () { return 0.5 - Math.random() })

  const wrong = preguntas[t].respuestas
  const correct = [true, false, false, false].sort(function () { return 0.5 - Math.random() })
  let answers = []
  for (let i = 0; i < wrong.length; i++) {
    let pair = { respuesta: wrong[i], correcta: correct[i]}
    answers.push(pair)
  }
  const diff = difficulty.sort(function () { return 0.5 - Math.random() })
  questions.push({
    enunciado: preguntas[t].enunciado,
    imagen_url: "",
    answers_wrong: wrong,
    answers_correct: right,
    answers: answers,
    tema_id: temas[0],
    category: preguntas[t].category,
    difficulty: diff[0]
  })

  t += 1
} while (t < q)
console.log(questions[1])
console.log(questions.length)

const data2 = JSON.stringify(questions)
fs.writeFileSync('questions.json', data2)
// mongoimport --db reboot-last-backend-dev --collection questions --file questions.json --jsonArray