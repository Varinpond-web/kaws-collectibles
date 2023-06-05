import Balancer from "react-wrap-balancer";
import PostObject from "@/components/layout/post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

  
export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h3
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer className="text-2xl text-center my-8">Hottest post  !</Balancer>
          <ul>
            <PostObject session={session}/>
          </ul>
        </h3>
      </div>
    </>
  );
}
