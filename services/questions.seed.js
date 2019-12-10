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
  const wrong = preguntas[t].respuestas
  const diff = difficulty.sort(function () { return 0.5 - Math.random() })
  questions.push({
    enunciado: preguntas[t].enunciado,
    imagen_url: "",
    answer_wrong: wrong,
    answers_correct: right,
    tema_id: "sf3r3r23fwf2",
    category: preguntas[t].category,
    difficulty: diff[0]
  })

  t += 1
} while (t < q)
console.log(questions[0])
console.log(questions.length)

const data2 = JSON.stringify(questions)
fs.writeFileSync('questions.json', data2)
// mongoimport --db reboot-last-backend-dev --collection questions --file questions.json --jsonArray