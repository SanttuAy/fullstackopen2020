const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('tiny')) //oikea paikka app:in jälkeen!
app.use(express.json())
const cors = require('cors')
app.use(cors())


let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
 const paivays = new Date()
app.get('/info', (req, res) => {
res.send(`<div>Puhelinluettelossa on ${persons.length} henkilön tiedot</div> 
  <div>${paivays}</div>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const idGeneraattori = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body) 
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'henkilön tietoja puuttuu' 
    })
  }

  const person = {
    name: body.name,
    number: body.number, 
    id: idGeneraattori(),
  }

  const nimet = persons.map((person) => person.name.toLocaleLowerCase())

if (nimet.includes(body.name.toLocaleLowerCase())) {
    return response.status(400).json({ 
      error: 'nimen on oltava uniikki' 
    })
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})