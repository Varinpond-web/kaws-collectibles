"use client";

import { Int32 } from "mongodb";
import { useRouter } from "next/navigation";
interface DeleteButtonProps {
    id: Int32;  // Update the type based on your data
}

const DeleteRequestButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const router = useRouter();
    const deletePost = async () => {
    console.log("id:",id);
    await fetch(`/api/deleterequest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });
        router.refresh();
    };
    return (
        <div className="grid justify-items-end">
            <button className="bg-blue-500 justify-items-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deletePost}>
                Remove
            </button>
        </div>
    );
}

export default DeleteRequestButton;