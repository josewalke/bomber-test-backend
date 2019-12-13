const fs = require('fs')

var t = 0
var lastNames = [
  'González',
  'Rodríguez',
  'Gómez',
  'Fernández',
  'López',
  'Díaz',
  'Martínez',
  'Pérez',
  'García',
  'Sánchez',
  'Romero',
  'Sosa',
  'Torres',
  'Álvarez',
  'Ruiz',
  'Ramírez',
  'Flores',
  'Benítez',
  'Acosta',
  'Medina',
  'Herrera',
  'Suárez',
  'Aguirre',
  'Giménez',
  'Gutiérrez',
  'Pereyra',
  'Rojas',
  'Molina',
  'Castro',
  'Ortiz',
  'Silva',
  'Núñez',
  'Luna',
  'Juárez',
  'Cabrera',
  'Ríos',
  'Morales',
  'Godoy',
  'Moreno',
  'Ferreyra',
  'Domínguez',
  'Carrizo',
  'Peralta',
  'Castillo',
  'Ledesma',
  'Quiroga',
  'Vega',
  'Vera',
  'Muñoz',
  'Ojeda',
  'Ponce',
  'Villalba',
  'Cardozo',
  'Navarro',
  'Coronel',
  'Vázquez',
  'Ramos',
  'Vargas',
  'Cáceres',
  'Arias',
  'Figueroa',
  'Córdoba',
  'Correa',
  'Maldonado',
  'Paz',
  'Rivero',
  'Miranda',
  'Mansilla',
  'Farias',
  'Roldán',
  'Méndez',
  'Guzmán',
  'Agüero',
  'Hernández',
  'Lucero',
  'Cruz',
  'Páez',
  'Escobar',
  'Mendoza',
  'Barrios',
  'Bustos',
  'Ávila',
  'Ayala',
  'Blanco',
  'Soria',
  'Maidana',
  'Acuña',
  'Leiva',
  'Duarte',
  'Moyano',
  'Campos',
  'Soto',
  'Martín',
  'Valdez',
  'Bravo',
  'Chávez',
  'Velázquez',
  'Olivera',
  'Toledo'
]
var name = [
  'HUGO',
  'LUCAS',
  'MARTIN',
  'DANIEL',
  'PABLO',
  'MATEO',
  'ALEJANDRO',
  'LEO',
  'ALVARO',
  'MANUEL',
  'ADRIAN',
  'DAVID',
  'MARIO',
  'DIEGO',
  'ENZO',
  'MARCO',
  'JAVIER',
  'MARCOS',
  'IZAN',
  'ANTONIO',
  'BRUNO',
  'SERGIO',
  'ALEX',
  'MIGUEL',
  'CARLOS',
  'MARC',
  'THIAGO',
  'JUAN',
  'GONZALO',
  'OLIVER',
  'NICOLAS',
  'JORGE',
  'ANGEL',
  'DYLAN',
  'ERIC',
  'GABRIEL',
  'JOSE',
  'GAEL',
  'SAMUEL',
  'DARIO',
  'LUCIA',
  'SOFIA',
  'MARTINA',
  'MARIA',
  'PAULA',
  'JULIA',
  'EMMA',
  'VALERIA',
  'DANIELA',
  'ALBA',
  'SARA',
  'CARLA',
  'CARMEN',
  'NOA',
  'CLAUDIA',
  'VALENTINA',
  'ALMA',
  'VEGA',
  'ANA',
  'OLIVIA',
  'LOLA',
  'CHLOE',
  'ELENA',
  'AITANA',
  'LARA',
  'MARTA',
  'JIMENA',
  'VERA',
  'ALEJANDRA',
  'MIA',
  'LAIA',
  'IRENE',
  'ADRIANA',
  'INES',
  'ABRIL',
  'TRIANA',
  'CANDELA',
  'CARLOTA',
  'LAURA',
  'ARIADNA'
]

var password = '$2b$10$XdUkntu2p.QqZm1M1ZJZm.SkAE0.zDfz4wtIikg378wTQzpHgIwIm'

var suscriptions = ["Basic", "Pro", "Premium"]
var users = []


// users seed
t = 0
do {
  t += 1
  lastNames = lastNames.sort(function () { return 0.5 - Math.random() })
  name = name.sort(function () { return 0.5 - Math.random() })
  role = "cliente"
  phone = Math.floor(Math.random() * (659999999 - 609000000 + 1)) + 609000000;
  createdAt = Date.now()
  suscription_type = suscriptions.sort(function () { return 0.5 - Math.random() })
  active = [false, true].sort(function () { return 0.5 - Math.random() })

  users.push({
    name: name[0],
    lastName: lastNames[0],
    email: name[0] + '.' + lastNames[0] + '@gmail.com',
    img_url: "https://www.coachcarson.com/wp-content/uploads/2018/09/Chad-Profile-pic-circle.png",
    password: password,
    role: role,
    phone: phone,
    createdAt: createdAt,
    suscription_type: suscription_type,
    suscription_start: createdAt,
    suscription_end: createdAt,
    active: active[0],
    mensajes: "10",
    MensajesTotales: "132",
    aprobados: "34",
    suspendidos: "12",
    total: "46"
  })
} while (t < 20)
console.log(users[0])
console.log(users.length)

const data2 = JSON.stringify(users)
fs.writeFileSync('users.json', data2)
// mongoimport --db reboot-last-backend-dev --collection users --file users.json --jsonArray