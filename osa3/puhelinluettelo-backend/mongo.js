const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://pmeris:${password}@cluster0.g088k.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })

} else if(process.argv.length === 5) {
    
    const person_name = process.argv[3]
    const person_number = process.argv[4]
      
    const person = new Person({
        name: person_name,
        number: person_number
    })
      
    person.save().then(response => {
        console.log(`added ${person_name} number ${person_number} to phonebook`)
        mongoose.connection.close()
    })
}