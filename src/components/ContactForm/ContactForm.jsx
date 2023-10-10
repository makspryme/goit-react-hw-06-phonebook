import { useState } from 'react';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleInputChange(e) {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    reset();
    return onSubmit({ name: name, number: number });
  }

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <div>
      <form className="form-contact" onSubmit={handleSubmitForm}>
        <label className="label-contact">
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            value={name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="label-contact">
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            value={number}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className="btn-submit" type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
}
