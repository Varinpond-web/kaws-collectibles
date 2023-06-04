"use client";

import { useRouter } from "next/navigation";
interface EditButtonProps {
    id: string;  // Update the type based on your data
    title: string;
    publishedDate: string;
    price: string;
    setEdit: (value: string) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ id, title,  publishedDate, price, setEdit}) => {
    const router = useRouter();
    const editPost = async () => {
    console.log("id:",id,"title",title,"publishedDate",publishedDate,"price",price);
    await fetch(`/api/updatecollection`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            title: title,
            publishedDate: publishedDate,
            price: price,
        }),
    }).then((res) => {
        console.log(res);
        if (res.ok) {
          router.refresh();
        }
      });setEdit('');};
    return (
        <button className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={editPost}>
            Submit
        </button>
    );
}

export default EditButton;