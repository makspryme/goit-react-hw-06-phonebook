import { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContats] = useState(() =>
    JSON.parse(localStorage.getItem('contacts') ?? '')
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function removerContacts(data) {
    setContats(s => s.filter(contact => contact.id !== data.id));
  }

  function handleFilterChange(e) {
    setFilter(e.currentTarget.value);
  }

  function handleSubmitForm(newContact) {
    for (const { name } of contacts) {
      if (name === newContact.name) {
        alert(`${name} is already in contacts`);
        return;
      }
    }

    newContact = {
      ...newContact,
      id: nanoid(),
    };

    setContats(s => [...s, newContact]);
  }

  const filteredContacts = [...contacts].filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmitForm} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList filtered={filteredContacts} onDelete={removerContacts} />
    </div>
  );
}
