import { JSX } from "react";
interface Sort {
    sortBy: string;
    sortDir: string;
}
interface SortProps {
    sort: Sort;
    setSort: (sort: Sort) => void;
}
function SortParams({ sort, setSort }: SortProps): JSX.Element {
    return (
        <div className="sort">
            <div className="flex gap-2">
                <select
                    name="sortBy"
                    id="sortBy"
                    value={sort.sortBy}
                    onChange={(e) => setSort({ ...sort, sortBy: e.target.value })}
                    className="px-2 py-2 border border-gray-600 rounded"
                >
                    <option value="member_id">Sort By ID</option>
                    <option value="name">Sort By Name</option>
                    <option value="dob">Sort By DoB</option>
                </select>
                <select
                    name="sortDir"
                    id="sortDir"
                    value={sort.sortDir}
                    onChange={(e) => setSort({ ...sort, sortDir: e.target.value })}
                    className="px-2 py-2 border border-gray-600 rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>

                </select>
            </div>
        </div>
    );
}

export default SortParams;