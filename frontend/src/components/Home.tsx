import { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filters from "./Filters";
import PerPage from "./PerPage";
import SearchParams from "./Search";
import SortParams from "./Sort";

interface Member {
    member_id: string;
    name: string;
    gender: boolean;
    email: string;
    dob: string;
    role: boolean;
}

interface Pagination {
    current_page: number;
    last_page: number;
}
interface FiltersType {
    gender: boolean | "all";
    role: boolean | "all";
}
interface Search {
    search: string;
    searchBy: string;
}
interface Sort {
    sortBy: string;
    sortDir: string;
}
interface HomeProps {
    data: Member[];
    pagination: Pagination;
    onPageChange: (page: number) => void;
    onDelete: (id: string) => void;
    filters: FiltersType;
    setFilters: (filters: FiltersType) => void;
    perpage: number;
    setPerPage: (perpage: number) => void;
    search: Search;
    setSearch: (search: Search) => void;
    sort: Sort;
    setSort: (sort: Sort) => void;
}


function Home({ data, pagination, onPageChange, onDelete, filters, setFilters, perpage, setPerPage, search, setSearch, sort, setSort }: HomeProps): JSX.Element {
    const [isDelete, setIsDelete] = useState(false);
    const [idDelete, setIdDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login');
    }
    return (
        <div className="home p-6">
            <div className="w-full mb-4 flex justify-between items-center">
                <h2 className="font-bold text-blue-600 text-3xl ">
                    Member Information Management
                </h2>
                <button className="px-2 py-2 bg-red-600 text-white rounded mb-4 hover:bg-red-700 hover:cursor-pointer" onClick={handleSignOut}>Sign out</button>
            </div>

            <button className="px-2 py-2 bg-green-600 text-white rounded mb-4 hover:bg-green-700 hover:cursor-pointer" onClick={() => navigate("/create")}>Create new member
            </button>
            <div className="w-full mb-4 flex justify-between items-center">
                <Filters filters={filters} setFilters={setFilters} />
                <PerPage perpage={perpage} setPerPage={setPerPage} />
            </div>
            <div className="mb-4 flex justify-between items-center">
                <SearchParams search={search} setSearch={setSearch} />
                <SortParams sort={sort} setSort={setSort} />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">STT</th>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Gender</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Date of birth</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((mem, index) => (
                                <tr
                                    key={mem.member_id}
                                    className="border-t hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-2">
                                        {(pagination.current_page - 1) * 10 + index + 1}
                                    </td>
                                    <td className="px-4 py-2">{mem.member_id}</td>
                                    <td className="px-4 py-2">{mem.name}</td>
                                    <td className="px-4 py-2">
                                        {mem.gender ? "Male" : "Female"}
                                    </td>
                                    <td className="px-4 py-2">{mem.email}</td>
                                    <td className="px-4 py-2">{mem.dob}</td>
                                    <td className="px-4 py-2">
                                        {mem.role ? "Member" : "Admin"}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <Link to={`/detail/${mem.member_id}`} className="text-blue-600 hover:underline">
                                            Detail
                                        </Link>
                                        <Link to={`/edit/${mem.member_id}`} className="text-green-600 hover:underline">
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => { setIsDelete(true); setIdDelete(mem.member_id); }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-4 text-gray-500 italic"
                                >
                                    No members found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2 my-4">
                <button
                    onClick={() => onPageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer"
                >
                    Prev
                </button>

                <span>
                    Page {pagination.current_page} / {pagination.last_page}
                </span>

                <button
                    onClick={() => onPageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:cursor-pointer   "
                >
                    Next
                </button>
            </div>
            {isDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <p className="text-center font-bold">Are you sure you want to delete <span className="text-red-500">{idDelete}</span> ?</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                className="w-full px-4 py-2 bg-red-600 text-white rounded"
                                onClick={() => {
                                    if (idDelete) onDelete(idDelete);
                                    setIsDelete(false);
                                    setIdDelete(null);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="w-full px-4 py-2 bg-gray-300 rounded"
                                onClick={() => {
                                    setIsDelete(false);
                                    setIdDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Home;
