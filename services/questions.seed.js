const fs = require('fs')
const difficulty = ["Fácil", "Media", "Dificil"]
const questions = []
const preguntas =  require('./all.questions')
const temas = ["5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18b011f0e6026f3ea4c386", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e18bd1ef0e6026f3ea4c387", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400", "5e1c83e5a0e3ed2874b6b400"]



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
    tema_id: temas[t],
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