import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type ArticleMeta = {
  title: string;
  summary: string;
  slug: string;
  date: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

const articlesDir = path.join(process.cwd(), 'articles');

export function getAllArticles(): ArticleMeta[] {
  const filenames = fs.readdirSync(articlesDir);

  return filenames.map((filename) => {
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    const { data } = matter(fileContents);

    return {
      title: data.title,
      summary: data.summary,
      slug: data.slug,
      date: stats.birthtime.toISOString(),
    };
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    summary: data.summary,
    slug: data.slug,
    date: data.date,
    contentHtml,
  };
}
