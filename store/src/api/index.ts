import axios from 'axios';
import { ArticleWithQuantity } from './typings';

const baseURL = 'http://localhost:9301/';

const makePath = (path: string) => [baseURL, path].join('');

export async function getArticles() {
  const response = await axios.get(makePath('articles'));
  return response.data;
}

export async function registerOrder(items: {
  articles: ArticleWithQuantity[];
  totalAmount: number;
}) {
  const response = await axios.post(makePath('orders'), items);
  return response.data;
}

export async function verifyTransaction(transactionId: string, data: string) {
  const response = await axios.post(makePath('transactions/webhook'), {
    transactionId,
    data,
  });
  return response.data;
}
