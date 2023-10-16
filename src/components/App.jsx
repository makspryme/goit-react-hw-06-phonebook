import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilter,
  add,
  remove,
} from './redux/store';

export default function App() {
  const dispatch = useDispatch();
  const valueContacts = useSelector(store => store.contacts);
  const filterValue = useSelector(store => store.filter);
  
  function removerContacts(data) {
    dispatch(remove(data.id));
  }

  function handleFilterChange(e) {
    console.log(e.currentTarget.value);
    dispatch(changeFilter(e.currentTarget.value));
  }

  function handleSubmitForm(newContact) {
    for (const { name } of valueContacts) {
      if (name === newContact.name) {
        alert(`${name} is already in contacts`);
        return;
      }
    }

    newContact = {
      ...newContact,
      id: nanoid(),
    };

    dispatch(add(newContact));
  }

  const filteredContacts = valueContacts.filter(contact => {
    return contact.name.toLowerCase().includes(filterValue.toLowerCase());
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmitForm} />
      <h2>Contacts</h2>
      <Filter value={filterValue} onChange={e => handleFilterChange(e)} />
      <ContactList filtered={filteredContacts} onDelete={removerContacts} />
    </div>
  );
}
