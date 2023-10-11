export interface Article {
  id: string;
  label: string;
  image: string;
  amount: number;
}

export interface ArticleWithQuantity {
  articleId: string;
  quantity: number;
}
