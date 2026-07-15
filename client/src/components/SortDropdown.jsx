const SortDropdown = ({ value, onChange, options = [] }) => (
  <label className="sort-field">
    <span className="sr-only">Sort results</span>
    <select className="sort-select" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

export default SortDropdown;
