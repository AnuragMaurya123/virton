import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
console.log(isAuthenticated);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin && !loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return <>{children}</>;
}
