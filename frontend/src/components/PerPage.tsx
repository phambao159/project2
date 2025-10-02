import { JSX } from "react";

interface PerPageProps {
    perpage: number;
    setPerPage: (perpage: number) => void;
}

function PerPage({ perpage, setPerPage }: PerPageProps): JSX.Element {
    return (
        <div className="perpage">
            <select
                name="perpage"
                id="perpage"
                value={perpage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="px-2 py-2 border border-gray-600 rounded"
            >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
            </select>
        </div>
    );
}

export default PerPage;
