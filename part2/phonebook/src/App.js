import React, { useEffect, useState } from 'react'
import personService from './services/persons.js'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  if (message.includes("Information")) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Filter = ({name, handler}) => {
  return (
    <div>
      filter shown with <input value={name} onChange={handler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div> 
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <tr>
      <td>{person.name} {person.number} 
      <button onClick={handleDelete}>delete</button></td>
    </tr>
  )
}

const Persons = ({personsToShow, persons, setPersons, setMessage}) => {
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .deletePerson(id)
      .then(data=> setPersons(persons.filter(p=> p.id !== id)))
      .catch(error => {
        setMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(()=>setMessage(null),5000)
        setPersons(persons.filter(p => p.id !==id))
      })
    }
  }

  return (
    <table>
      <tbody>
      {personsToShow.map(person => 
      <Person key={person.id} person={person} handleDelete={()=>handleDelete(person.id)}/>)}
      </tbody>
    </table>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p=>p.name===person.name)) {
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with new one?`)) {
        const personId = persons.find(p => p.name === person.name).id
        personService
          .update(personId,person)
          .then(returnedPerson => {
            setMessage(`Number changed to ${returnedPerson.number}`)
            setTimeout(()=>setMessage(null),5000)
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
          })
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(()=>setMessage(null),5000)
            setPersons(persons.filter(p => p.id !==personId))
          })
      }
    } else {
      personService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newPerson.name}`)
        setTimeout(()=>setMessage(null),5000)
      })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = filterName==='' ? 
  persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter name={filterName} handler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setMessage={setMessage} /> 
      
      
    </div>
  )
}

export default App