import { JSX } from "react";

interface Filters {
    gender: boolean | "all";
    role: boolean | "all";
}

interface FiltersProp {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

function Filters({ filters, setFilters }: FiltersProp): JSX.Element {
    const handleChange = (key: keyof Filters, value: string) => {
        let newValue: boolean | "all" = "all";

        if (value === "true") newValue = true;
        else if (value === "false") newValue = false;

        setFilters({
            ...filters,
            [key]: newValue,
        });
    };

    return (
        <div className="filters">
            <div className="flex gap-4">
                {/* Gender */}
                <div className="flex border border-gray-500 rounded p-2 gap-2 align-items-center">
                    <p>Gender:</p>
                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="gender"
                            value="true"
                            checked={filters.gender === true}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        <label>Male</label>
                    </div>

                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="gender"
                            value="false"
                            checked={filters.gender === false}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        <label>Female</label>
                    </div>

                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="gender"
                            value="all"
                            checked={filters.gender === "all"}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        <label>All</label>
                    </div>
                </div>

                {/* Role */}
                <div className="flex border border-gray-500 rounded p-2 gap-2">
                    <p>Role:</p>
                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="role"
                            value="true"
                            checked={filters.role === true}
                            onChange={(e) => handleChange("role", e.target.value)}
                        />
                        <label>Member</label>
                    </div>
                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="role"
                            value="false"
                            checked={filters.role === false}
                            onChange={(e) => handleChange("role", e.target.value)}
                        />
                        <label>Admin</label>
                    </div>
                    <div className="flex align-items-center gap-1">
                        <input
                            type="radio"
                            name="role"
                            value="all"
                            checked={filters.role === "all"}
                            onChange={(e) => handleChange("role", e.target.value)}
                        />
                        <label>All</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
