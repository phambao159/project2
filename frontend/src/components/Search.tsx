import { JSX } from "react";
interface Search {
    search: string;
    searchBy: string;
}
interface SearchProps {
    search: Search;
    setSearch: (search: Search) => void;
}
function SearchParams({ search, setSearch }: SearchProps): JSX.Element {
    return (
        <div className="search w-full max-w-3xl">
            <div className="flex gap-2">
                <input type="text" name="search" placeholder="Search" className="p-2 border border-gray-600 rounded w-2/3" value={search.search} onChange={(e) => setSearch({ ...search, search: e.target.value })} />
                <select
                    name="searchBy"
                    id="searchBy"
                    value={search.searchBy}
                    onChange={(e) => setSearch({ ...search, searchBy: e.target.value })}
                    className="px-2 py-2 border border-gray-600 rounded"
                >
                    <option value="member_id">Search By ID</option>
                    <option value="name">Search By Name</option>
                    <option value="email">Search By Email</option>
                </select>
            </div>
        </div>
    );
}

export default SearchParams;