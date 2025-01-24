import { headerOption } from "@/constant";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header className="absolute top-0 w-full z-50 bg-transparent">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div>
            <img src="/logo.png" alt="Logo"  />
          </div>
          {/* Add navigation or other elements here if needed */}
          <div className="flex items-center justify-between gap-8">
            {
                headerOption.map((option,i)=>(
                    <div key={i} className="text-white text-base">{option.title}</div>
                ))
            }
              <Button className="bg-blue-950">
                <Link to={"/login"}>
                Login
                </Link>
              </Button>
              <Button className="bg-transparent border">
                <Link to={"/login"}>
                Signup
                </Link>
              </Button>
          </div>
          
        </div>
      </header>
    );
  }
  