import { useState, useEffect, JSX } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectRoute";

// Định nghĩa kiểu Member theo API trả về
interface Member {
  member_id: string;
  name: string;
  gender: boolean;
  email: string;
  dob: string;
  role: boolean;
}

// Kiểu cho Pagination
interface Pagination {
  current_page: number;
  last_page: number;
}

interface Filters {
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
function App(): JSX.Element {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;
  const [members, setMembers] = useState<Member[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
  });

  const [filters, setFilters] = useState<Filters>({
    gender: "all",
    role: "all",
  });
  const [perpage, setPerPage] = useState(10);
  const [search, setSearch] = useState<Search>({
    search: "",
    searchBy: "member_id"
  })
  const [sort, setSort] = useState<Sort>({
    sortBy: "member_id",
    sortDir: "asc"
  })
  const [token, setToken] = useState<string | null>(localStorage.getItem("jwt_token"));

  const getMember = async (page: number = 1) => {
    try {
      // chuyển filter boolean -> string cho query
      if (!token) {
        console.log("Chưa có token, không fetch API");
        return;
      }
      setToken(token);
      const genderParam =
        filters.gender === "all" ? "" : filters.gender ? "1" : "0";
      const roleParam =
        filters.role === "all" ? "" : filters.role ? "1" : "0";

      const query = new URLSearchParams({
        page: page.toString(),
        ...(genderParam && { gender: genderParam }),
        ...(roleParam && { role: roleParam }),
        ...(perpage && { perpage: perpage.toString() }),
        ...(search.search) && { search: search.search },
        ...(search.searchBy) && { searchBy: search.searchBy },
        ...(sort.sortBy) && { sortBy: sort.sortBy },
        ...(sort.sortDir) && { sortDir: sort.sortDir },
      }).toString();

      const res = await fetch(`${API_BASE_URL}/api/members?${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setMembers(json.message.data);
      setPagination({
        current_page: json.message.current_page,
        last_page: json.message.last_page,
      });
    } catch (error) {
      console.error("Error get member:", error);
    }
  };

  const fetchDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/members/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.message) {
        getMember(1);
      }
    } catch (error) {
      console.log("Error fetch delete:", error);
    }
  };
  const fetchCreate = async (data: Member) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.message) {
        getMember(1);
      }
    } catch (error) {
      console.log("Error fetch create:", error);
    }
  }
  const fetchShow = async (id: string): Promise<Member | undefined> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/members/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      return json.data as Member;
    } catch (error) {
      console.log("Error fetch delete:", error);
    }
  };
  const fetchEdit = async (id: string, data: Member) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.message) {
        getMember(1);
      }
    } catch (error) {
      console.log("Error fetch edit:", error);
    }
  };
  useEffect(() => {
    getMember(1);
  }, [token, filters, perpage, search, sort]);

  return (
    <div className="main">


      <Routes>
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route
            path="/"
            element={
              <Home
                data={members}
                pagination={pagination}
                onPageChange={getMember}
                onDelete={fetchDelete}
                filters={filters}
                setFilters={setFilters}
                perpage={perpage}
                setPerPage={setPerPage}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          <Route path="/create" element={<Create onCreate={fetchCreate} />} />
          <Route path="/edit/:id" element={<Edit onShow={fetchShow} onEdit={fetchEdit} />} />
          <Route path="/detail/:id" element={<Detail onShow={fetchShow} />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
