import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllArticles } from '../../../lib/getArticles.server';
import { format } from 'date-fns';

export default async function ArticlesPage() {
  const articles = await getAllArticles(); // <-- must be async

  return (
    <>
      <Header />
      <main className='min-h-screen text-gray-800 px-6 lg:px-16 pt-[230px] pb-20 bg-gray-200'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-4xl font-bold mb-10 text-center'>
            Industry Insights & Articles
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {articles.map((article) => (
              <article
                key={article.slug}
                className='bg-white p-6 rounded-lg shadow-md flex flex-col justify-between'
              >
                <p className='text-sm mb-2'>
                  {format(new Date(article.date), 'MMMM d, yyyy')}
                </p>
                <div>
                  <h2 className='text-2xl font-semibold mb-2'>
                    {article.title}
                  </h2>
                  <p className='mb-6'>{article.summary}</p>
                </div>
                <a
                  href={`/articles/${article.slug}`}
                  className='bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm w-fit'
                >
                  Read More
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
