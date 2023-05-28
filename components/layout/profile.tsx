"use client";

import Image from "next/image";
import { Session } from "next-auth";
import PostObject from "@/components/layout/mypost";
export default function Profile({ session }: { session: Session | null }) {
  const { email, image } = session?.user || {};
  const name = session?.user?.name;
  return (
    <>
    <div
        className="mb-10 rounded border border-gray-200 bg-white p-6 text-black shadow-lg"
        style={{
        justifyContent: "center",
        width: "80vw",
        height: "100vh",
        }}
    >
        <div
        style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "top",
        }}
        >
            <Image
                alt={email || "profile"}
                src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
                width={110}
                height={110}
            />
            <p style={{ marginLeft: "10px" }}>{session?.user?.name}</p>
        </div>
        POST
        <PostObject username={name}/>
    </div>

    </>
  );
}
