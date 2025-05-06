const SearchBar = ({ handleChangeQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;
    if (!query.trim()) return;
    handleChangeQuery(query);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
