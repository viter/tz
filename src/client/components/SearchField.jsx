export default function SearchField({ handleSearch, searchText }) {
  return (
    <>
      <input
        className="outline-none focus:ring-0 px-2"
        onChange={handleSearch}
        value={searchText}
      />
    </>
  );
}
