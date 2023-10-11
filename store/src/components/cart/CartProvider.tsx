import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Article } from '../../api/typings';

const storageKey = '__kkp_cart_store__';

type ArticleWithQuantity = {
  article: Article;
  quantity: number;
  totalAmount: number;
};

type CartContextArgs = {
  addToCart: (article: Article) => void;
  removeFromCart: (id: string) => void;
  count: number;
  items: ArticleWithQuantity[];
  clearCart: () => void;
};
const CartContext = createContext<CartContextArgs>({
  addToCart: () => {},
  removeFromCart: () => {},
  count: 0,
  items: [],
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<ArticleWithQuantity[]>(() => {
    const inStore = localStorage.getItem(storageKey);
    if (!inStore) return [];
    return JSON.parse(inStore).items;
  });

  const persistCarts = (items: ArticleWithQuantity[]) => {
    setCartItems(items);
    localStorage.setItem(storageKey, JSON.stringify({ items }));
  };

  const addToCart = (article: Article) => {
    const item = cartItems.find((it) => it.article.id === article.id);
    if (!item) {
      persistCarts([
        ...cartItems,
        { article, quantity: 1, totalAmount: article.amount },
      ]);
      return;
    }

    item.quantity++;
    item.totalAmount = item.article.amount * item.quantity;
    persistCarts([...cartItems]);
  };

  const removeFromCart = (id: string) => {
    const newItems = cartItems.filter((item) => item.article.id !== id);
    persistCarts([...newItems]);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        count: cartItems.length,
        items: cartItems,
        clearCart: () => persistCarts([]),
      }}>
      {children}
    </CartContext.Provider>
  );
}
