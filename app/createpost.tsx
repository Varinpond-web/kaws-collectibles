// "use client";

// import { Post } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { useState } from 'react';

// export default function PostComponent() {
//     const router = useRouter();
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     const update = async () => {
//       await fetch(`/api/todo`, {
//         method: "CREATE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             title: title,
//             content: content,
//             published: true,
//         }),
//       });
//       router.refresh();
//     };
  
//     return (
//       <div className="container mx-auto py-10">
//         <h1 className="text-3xl font-bold mb-5">Create Post</h1>
//             <form onSubmit={() => update()}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-bold mb-2" >Title</label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 font-bold mb-2" >Content</label>
//                     <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
//                 </div>
//                 <div className="flex items-center justify-center">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                         Create
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
//   }