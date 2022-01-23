/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */

function Clock() {
  
  
  const uniqueId = useId();
  const id = `idInput${uniqueId}`;
  return (
    <form>
      <label htmlFor={id}>City name:</label>
      <input
        type="text"
        placeholder="Search.."
        name="search"
        id={id}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
