export default function ContactList({ filtered, onDelete }) {
  return (
    <ul>
      {filtered.map(contact => {
        return (
          <li key={contact.id} id={contact.id}>
            {`${contact.name} - ${contact.number}`}
            <button
              type="text"
              onClick={e => {
                onDelete(e.target.parentElement);
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
