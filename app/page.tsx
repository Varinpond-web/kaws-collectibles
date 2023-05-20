import Balancer from "react-wrap-balancer";
import PostObject from "@/components/layout/post";

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/steven-tey/precedent",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 60 seconds
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
  
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h3
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer className="text-2xl text-center my-8">Hottest post  !</Balancer>
          <ul>
            <PostObject/>
          </ul>
        </h3>
      </div>
    </>
  );
}
