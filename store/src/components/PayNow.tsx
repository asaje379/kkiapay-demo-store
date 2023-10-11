/* eslint-disable @typescript-eslint/no-explicit-any */
import { openKkiapayWidget, addSuccessListener } from 'kkiapay';
import { useEffect } from 'react';
import { useCart } from './cart/CartProvider';
import { registerOrder, verifyTransaction } from '../api';
import { useNavigate } from 'react-router-dom';

type Props = {
  amount: number;
};

export const PayNow = ({ amount }: Props) => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    addSuccessListener(async ({ transactionId, data }: any) => {
      const { success } = await verifyTransaction(transactionId, data);
      if (success) {
        clearCart();
        navigate('/');
      }
    });
  }, []);

  const pay = async () => {
    const articles = items.map((item) => ({
      articleId: item.article.id,
      quantity: item.quantity,
    }));
    await registerOrder({ articles, totalAmount: amount });

    openKkiapayWidget({
      amount,
      key: '3425dc6035d711eca8f5b92f2997955b',
      sandbox: true,
      data: {},
    });
  };

  return (
    <button
      onClick={pay}
      className="bg-red-500 text-white rounded px-4 py-2 font-bold hover:bg-red-700">
      Payer maintenant
    </button>
  );
};
