import { useEffect, useState } from 'react';
import { Article } from '../api/typings';
import { getArticles } from '../api';
import Card from '../components/Card';

export const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const request = async () => {
      const _articles = await getArticles();
      setArticles(_articles);
    };

    request();
  }, []);

  return (
    <div>
      <div className="text-3xl font-semibold text-slate-600">Nos articles</div>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Card
            key={article.id}
            {...article}
          />
        ))}
      </div>
    </div>
  );
};
