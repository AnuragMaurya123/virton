import { createRoot } from 'react-dom/client'; 
import './index.css'; 
import App from './App.tsx'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import AdminPlane from './pages/AdminPlane.tsx'; 
import Home from './pages/Home.tsx'; 
import AdminLogin from './pages/AdminLogin.tsx'; 
import { Provider } from 'react-redux'; 
import store from './store/store.ts'; 
import AdminAuthenticatedRouter from './AdminAuthenticatedRouter.tsx';

// Setting up the router for the app with route paths and corresponding components
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
        element: (
          // Wrapping AdminPlane with the AdminAuthenticatedRouter to ensure the admin is authenticated
          <AdminAuthenticatedRouter>
            <AdminPlane />
          </AdminAuthenticatedRouter>
        ),
      },
    ],
  },
]);

// Rendering the app inside the root element and wrapping it with Redux Provider to manage state
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* RouterProvider makes the defined routes available to the app */}
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
