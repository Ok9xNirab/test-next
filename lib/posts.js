import { glob } from "fast-glob";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import fs from "node:fs";
import path from "node:path";

export async function getLatestPosts(page = 1) {
  const postFolders = path.join(process.cwd(), "posts");
  // const categories = fs.readdirSync(postFolders, { encoding: "utf-8" });
  const posts = [];
  const postFilenames = await glob("*/*.mdx", {
    cwd: postFolders,
  });

  for await (let postFile of postFilenames) {
    const filePath = path.join(process.cwd(), "posts", postFile);
    const file = await read(filePath);
    matter(file);
    const frontmatter = file.data.matter;
    frontmatter["category"] = postFile.split("/")[0];
    posts.push(frontmatter);
  }
  const latestPosts = posts.sort(
    (post1, post2) =>
      new Date(post1.published_at) > new Date(post2.published_at)
  );

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;

  return {
    posts: latestPosts.slice(startIndex, endIndex),
    totalPages: parseInt(latestPosts.length / 10) + 1,
  };
}
