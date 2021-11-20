import "./Search.css";


const Search = ({ isOpenSearch }) => {
return (
    <div className="search-modal" style={{ display: isOpenSearch ? "flex" : "none" }}>
        <p className="search-p">No such contact</p>
    </div>
);
};
export default Search;