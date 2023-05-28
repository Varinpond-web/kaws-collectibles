import Profile from "@/components/layout/profile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Mycollecibles() {
  const session = await getServerSession(authOptions);
  return (
  <>
      <div
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-10l md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <Profile session={session}/>
      </div>
  </>);
}