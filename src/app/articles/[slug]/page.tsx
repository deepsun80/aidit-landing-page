import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getArticleBySlug } from '../../../../lib/getArticles.server';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<Record<string, string>>;
}

// Generate SEO metadata dynamically per article
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Ai.Dit',
      description: 'Sorry, we could not find this article.',
    };
  }

  return {
    title: `${article.title} | Ai.Dit`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Ai.Dit`,
      description: article.summary,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${article.title} | Ai.Dit`,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <>
      <Header />
      <main
        id='article'
        className='min-h-screen bg-white text-gray-800 px-6 lg:px-16 pt-[180px] pb-20'
      >
        <div className='max-w-3xl mx-auto'>
          <p className='text-sm text-gray-500 mb-6'>
            Posted on {format(new Date(article.date), 'MMMM d, yyyy')}
          </p>
          <h1 className='text-4xl font-bold mb-6'>{article.title}</h1>
          <div
            className='text-gray-800 space-y-4 text-lg'
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
