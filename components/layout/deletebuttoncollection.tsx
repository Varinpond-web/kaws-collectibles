"use client";

import { useRouter } from "next/navigation";
interface DeleteButtonProps {
    id: string;  // Update the type based on your data
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const router = useRouter();
    const deletePost = async () => {
    console.log("id:",id);
    await fetch(`/api/deletecollection`, {
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
        <button className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deletePost}>
            Delete
        </button>
    );
}

export default DeleteButton;