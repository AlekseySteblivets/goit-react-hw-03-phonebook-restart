import './App.css';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Copmonents/ContactForm/ContactForm';
import Filter from './Copmonents/Filter/Filter';
import ContactList from './Copmonents/ContactList/ContactList'

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',

  }

  componentDidMount() {
    let parsedContacts = JSON.parse(localStorage.getItem('myLocalStorageContacts'));
    console.log(parsedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })

    }

  }

  componentDidUpdate(prevProps, prevState) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('myLocalStorageContacts', JSON.stringify(this.state.contacts))
    }
  }



  handleFilterChange = (evt) => {
    this.setState({
      filter: evt.currentTarget.value
    })
  }

  addContact = (name, number) => {
    const idContact = uuidv4();
    let nameFromInput = { name: name, number: number, id: idContact };
    const findContact = this.state.contacts.find(contact => contact.name === name && contact.number === number);
    console.log(findContact);

    if (findContact) {
      alert(`${name} is already in contacts!`);
      return;
    }


    this.setState(prevState => ({
      contacts: [nameFromInput, ...prevState.contacts]
    }));
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  deleteContact = (idForDelete) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idForDelete)
    }));
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className='block'>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} оnChange={this.handleFilterChange} />
        <ContactList getVisibleContact={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    )
  }

}

export default App;
