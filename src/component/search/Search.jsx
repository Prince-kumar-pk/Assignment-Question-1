const Search = ({ searchText, onChange }) => {
  return <input type="text" value={searchText} onChange={onChange}  placeholder="Search By ordered ID....." />
}

export default Search
