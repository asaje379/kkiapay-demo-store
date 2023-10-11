import { Logo } from '../assets/Logo';
import { Icon } from '../components/Icon';
import { useCart } from '../components/cart/CartProvider';
import { useNavigate, Outlet } from 'react-router-dom';

export const Layout = () => {
  const { count } = useCart();

  const navigate = useNavigate();

  const gotoCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <div className="shadow-lg p-4 px-40 flex items-center gap-8 justify-between">
        <Logo />
        <div
          className="cursor-pointer"
          onClick={gotoCart}>
          <Icon>shopping_cart</Icon>
          {count}
        </div>
      </div>

      <div className="px-40 py-10">
        <Outlet />
      </div>
    </div>
  );
};
