import React from "react";
import { getLatestPosts } from "@/lib/posts";
import Link from "next/link";

export default async function LatestPostsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { totalPages, posts } = await getLatestPosts();
  return (
    <div style={{ margin: 20 }}>
      <h1>Total: {totalPages}</h1>
      <br />
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
