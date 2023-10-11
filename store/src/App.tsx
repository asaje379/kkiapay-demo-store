import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import CartProvider from './components/cart/CartProvider';

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
