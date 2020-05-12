const mongoose = require('mongoose')

if (process.argv.length<3) { //KOMENTORIVI: node mongo.js salasana
  console.log('anna parametrinä vähintään salasana')
  process.exit(1)
}

const password = process.argv[2] //tartutaan komentoriviparametriin
const nimi = process.argv[3]
const numero = process.argv[4]

const url = //kokoelman nimi määrittyy url:issa!
  `mongodb+srv://fullstack-opiskelija:${password}@cluster0-ektfu.mongodb.net/yhteystiedot?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({ //skeeman määrittely - tämän käyttö periaatteena Mongoosen käytössä
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema) //skeemaa vastaavan modelin luonti
// Person-parametrin käyttö Mongoosessa perustuu konventioon --> muodsotetaan  kokoelma people (tai Note --> notes)
const person = new Person({
  name: nimi,
  number: numero
})

if (process.argv.length===3) { //sisällön tulostus konsoliin
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close() //HUOM! tämän paikka tässä .then-takaisinkutsufunktion lopussa
      })
  }

if (process.argv.length>3) {  
    person.save().then(response => {
        console.log(`added ${nimi} number ${numero} to phonebook`)
        mongoose.connection.close()
    })
}
