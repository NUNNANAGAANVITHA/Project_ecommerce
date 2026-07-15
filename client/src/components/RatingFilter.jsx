const ratings = [
  { value: '', label: 'Any' },
  { value: '1', label: '1 star & up' },
  { value: '2', label: '2 stars & up' },
  { value: '3', label: '3 stars & up' },
  { value: '4', label: '4 stars & up' },
  { value: '5', label: '5 stars only' },
];

const RatingFilter = ({ minimumRating, onRatingChange }) => {
  return (
    <div className="filter-section">
      <h3>Minimum Rating</h3>
      <div className="filter-chip-list" role="radiogroup" aria-label="Minimum rating filter">
        {ratings.map((rating) => (
          <label className="radio-row" key={rating.value || 'any'}>
            <input
              type="radio"
              name="minimumRating"
              value={rating.value}
              checked={minimumRating === rating.value}
              onChange={() => onRatingChange(rating.value)}
            />
            <span>{rating.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
