export default function Filter({ value, onChange }) {
  return (
    <label>
      Find contact by name
      <br />
      <input type="text" name="filter" value={value} onChange={onChange} />
    </label>
  );
}
