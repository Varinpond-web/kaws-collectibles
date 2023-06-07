"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    id: string | number;  // Update the type based on your data
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const router = useRouter();

    const deletePost = async () => {
    await fetch(`/api/deletePost`, {
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
        // <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deletePost}>
        //     Delete
        // </button>
        <p className=" text-red-600 hover:underline text-base font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deletePost}>
            Delete
        </p>
    );
}

export default DeleteButton;