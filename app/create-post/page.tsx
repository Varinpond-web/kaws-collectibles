import prisma from "@/app/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-10l md:leading-[5rem]"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      <h1 className="font-bold">POST</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}