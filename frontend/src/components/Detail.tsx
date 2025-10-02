import { JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Member {
    member_id: string,
    name: string,
    gender: boolean,
    email: string,
    dob: string,
    role: boolean
}
interface DetailProps {
    onShow: (member_id: string) => Promise<Member | undefined>;
}
function Detail({ onShow }: DetailProps): JSX.Element {
    const [member, setMember] = useState<Member>({
        member_id: "",
        name: "",
        gender: true,
        email: "",
        dob: "",
        role: true
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            (async () => {
                const data = await onShow(id);
                if (data) setMember(data);
            })();
        }
    }, [id]);
    return (
        <div className="detail max-w-md w-full mx-auto mt-5 border border-gray-200 p-6">
            <p className="font-bold text-green-600 text-2xl mb-4 text-center">View Member Details</p>
            <p>Member ID: <strong>{member.member_id}</strong></p>
            <p>Name: <strong>{member.name}</strong></p>
            <p>Gender: <strong>{member.gender ? "Male" : "Female"}</strong></p>
            <p>Email: <strong>{member.email}</strong></p>
            <p>Date of birth: <strong>{member.dob}</strong></p>
            <p>Role: <strong>{member.role ? "Member" : "Admin"}</strong></p>
            <div className="flex gap-2 mt-5">
                <button className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer" onClick={() => navigate(`/edit/${member.member_id}`)}>Edit</button>
                <button className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:cursor-pointer" onClick={() => navigate("/")}>Cancel</button>
            </div>
        </div>
    );
}

export default Detail;