const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('tiny')) //oikea paikka app:in jälkeen!
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')


app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo</h1>')
})


app.get('/api/persons', (req, res) => { 
  Person.find({}).then(result => {
    res.json(result.map(yhteystieto => yhteystieto.toJSON()))
  })
})


app.get('/info', (req, res) => {
  const paivays = new Date()
  Person.estimatedDocumentCount({}).then (maara => {
    console.log(`maara on: ${maara}`)
    res.send(`<div>Puhelinluettelossa on ${maara} henkilön tiedot</div> 
      <div>${paivays}</div>
      `)
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then (person => { 
    if (person) {       //ts. "löytyykö tietokannasta tämä olio?""
    response.json(person.toJSON())
  } else {
    response.status(404).end() 
  }
  })
  .catch(error => next(error))    //keskitetään
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then( result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body) 

  const person = new Person( {
    name: body.name,
    number: body.number 
  })

  person.save()
    .then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


//Selvitetään onko kyse olemattomasta oliosta
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


//Selvitetään onko kyse virheellisestä olio-id:stä
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler) //OLTAVA VIIMEISENÄ!

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})