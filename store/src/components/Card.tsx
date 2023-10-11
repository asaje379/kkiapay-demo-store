import { Article } from '../api/typings';
import { useCart } from './cart/CartProvider';

type Props = Article;

export default function Card({ amount, id, image, label }: Props) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart({ amount, id, image, label });
  };

  return (
    <div className="border rounded flex gap-10 items-center p-6">
      <img
        src={image}
        alt="ALT"
      />
      <div>
        <div className="font-bold">{label}</div>
        <div>{amount} F CFA</div>

        <button
          onClick={handleClick}
          className="bg-blue-500 px-3 py-2 rounded mt-3 text-white hover:bg-blue-700 transition-all">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
