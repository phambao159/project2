import { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface FormDataType {
    member_id: string,
    name: string,
    gender: boolean,
    email: string,
    dob: string,
    role: boolean
}
interface EditProps {
    onEdit: (member_id: string, formData: FormDataType) => void;
    onShow: (member_id: string) => Promise<FormDataType | undefined>;
}
function Edit({ onShow, onEdit }: EditProps): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormDataType>({
        member_id: "",
        name: "",
        gender: true,
        email: "",
        dob: "",
        role: true
    })
    useEffect(() => {
        if (id) {
            (async () => {
                const data = await onShow(id);
                if (data) setFormData(data);
            })();
        }
    }, [id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: (value === "true" ? true : value === "false" ? false : value),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            onEdit(formData.member_id, formData);
        }
        navigate("/");
    };
    return (
        <div className="create max-w-md w-full mx-auto mt-5 border border-gray-200 p-6">
            <p className="font-bold text-green-600 text-2xl mb-4 text-center">Edit Member Information</p>
            <form action="" method="POST" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block">ID</label>
                    <input type="text" name="member_id" placeholder="Enter member id" className="w-full px-2 py-1 border border-gray-200 rounded text-gray-700" required onChange={handleChange} value={formData.member_id} readOnly />
                </div>
                <div className="mb-3">
                    <label className="block">Name</label>
                    <input type="text" name="name" placeholder="Enter member name" className="w-full px-2 py-1 border border-gray-200 rounded text-gray-700" required onChange={handleChange} value={formData.name} />
                </div>
                <div className="mb-3">
                    <label className="block">Gender</label>
                    <div className="flex border border-gray-200 rounded p-2 gap-10 align-items-center w-1/2">
                        <div className="flex align-items-center gap-1">
                            <input
                                type="radio"
                                name="gender"
                                value="true"
                                required onChange={handleChange}
                                checked={formData.gender === true}
                            />
                            <label>Male</label>
                        </div>

                        <div className="flex align-items-center gap-1">
                            <input
                                type="radio"
                                name="gender"
                                value="false"
                                required onChange={handleChange}
                                checked={formData.gender === false}
                            />
                            <label>Female</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block">Email</label>
                    <input type="email" name="email" placeholder="Enter member email" className="w-full px-2 py-1 border border-gray-200 rounded text-gray-700" required onChange={handleChange} value={formData.email} />
                </div>
                <div className="mb-3">
                    <label className="block">Date of birth</label>
                    <input type="date" name="dob" placeholder="Enter member dob" className="w-full px-2 py-1 border border-gray-200 rounded text-gray-700" required onChange={handleChange} value={formData.dob} />
                </div>
                <div className="mb-3">
                    <label className="block">Role</label>
                    <div className="flex border border-gray-200 rounded p-2 gap-10 align-items-center w-1/2">
                        <div className="flex align-items-center gap-1">
                            <input
                                type="radio"
                                name="role"
                                value="true"
                                required onChange={handleChange}
                                checked={formData.role === true}
                            />
                            <label>Member</label>
                        </div>

                        <div className="flex align-items-center gap-1">
                            <input
                                type="radio"
                                name="role"
                                value="false"
                                required onChange={handleChange}
                                checked={formData.role === false}
                            />
                            <label>Admin</label>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mt-5">
                    <button className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer">Edit</button>
                    <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:cursor-pointer" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;