import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { CartPage } from './pages/CartPage';
import { Layout } from './pages/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);
