import { Outlet, useLocation } from "react-router-dom"; // Importing Outlet to render matched child routes and useLocation to access the current URL
import Header from "./components/Header"; // Importing Header component to display the header
import Footer from "./components/Footer"; // Importing Footer component to display the footer

function App() {
  // Using useLocation to access the current pathname of the URL
  const location = useLocation();

  return (
    <div className="bg-blue-950">
      {/* Conditionally render the Header component if the current path is not '/adminplane' */}
      {location.pathname !== '/adminplane' && <Header />}
      
      {/* The Outlet component will render the matched child route */}
      <Outlet />
      
      {/* Conditionally render the Footer component if the current path is not '/adminplane' */}
      {location.pathname !== '/adminplane' && <Footer />}
    </div>
  );
}

export default App;
