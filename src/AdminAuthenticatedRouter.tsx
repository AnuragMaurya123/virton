import { useSelector } from "react-redux"; 
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react"; 

// Interface for the component's props, defining the children prop
interface AdminAuthenticatedRouterProps {
  children: React.ReactNode; 
}

export default function AdminAuthenticatedRouter({
  children,
}: AdminAuthenticatedRouterProps) {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate(); 

  // Logging `isAuthenticated` to debug and verify the authentication status
  console.log(isAuthenticated);

  useEffect(() => {
    // Retrieve the 'admin' data from localStorage
    const admin = localStorage.getItem("admin");

    // Check if there is no admin data, not loading, and not authenticated
    // If true, redirect the user to the login page
    if (!admin && !loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Render the children only if the user is authenticated, otherwise redirects to login
  return <>{children}</>;
}
