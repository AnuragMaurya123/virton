import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const location = useLocation();
  return (
    <div className="bg-blue-950 ">
       {location.pathname !== '/adminplane' && <Header />} 
      <Outlet/>
      {location.pathname !== '/adminplane' && <Footer/>}
    </div>
  );
}

export default App;
