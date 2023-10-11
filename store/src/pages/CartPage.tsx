import { useMemo } from 'react';
import { useCart } from '../components/cart/CartProvider';
import { Icon } from '../components/Icon';
import { PayNow } from '../components/PayNow';

export const CartPage = () => {
  const { items, removeFromCart } = useCart();

  const totalAmount = useMemo(
    () => items.reduce((acc, cur) => acc + cur.totalAmount, 0),
    [items],
  );

  const handleDeletion = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div>
      <div className="text-3xl font-semibold text-slate-600">Votre panier</div>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="p-2 text-left bg-slate-100">Désignation</th>
            <th className="p-2 text-left bg-slate-100">Prix unitaire</th>
            <th className="p-2 text-left bg-slate-100">Quantité</th>
            <th className="p-2 text-left bg-slate-100">Montant total</th>
            <th className="p-2 text-left bg-slate-100"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              className="border"
              key={item.article.id}>
              <td className="p-2">{item.article.label}</td>
              <td className="p-2">{item.article.amount}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.totalAmount}</td>
              <th>
                <Icon
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeletion(item.article.id)}>
                  delete
                </Icon>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-10">
        <div className="text-2xl text-slate-500">
          Montant total : {totalAmount} F CFA
        </div>
        <PayNow amount={totalAmount} />
      </div>
    </div>
  );
};
