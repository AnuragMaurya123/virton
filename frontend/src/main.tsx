import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPlane from './pages/AdminPlane.tsx';
import Home from './pages/Home.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import AdminAuthenticatedRouter from './AdminAuthenticatedRouter.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AdminLogin />,
      },
      {
        path: "/adminplane",
        element: <AdminAuthenticatedRouter><AdminPlane/></AdminAuthenticatedRouter>,
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <RouterProvider router={router}></RouterProvider>
      </Provider>
)

