import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Eye, EyeOff } from "lucide-react"; // Import the Eye and EyeOff icons
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/slice/authSlice";
const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
export default function AdminLogin() {
    const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/adminplane"); // Redirect to home or dashboard after login
    }else{
        navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex items-center justify-center relative h-[700px]">
      <Card className="w-[350px] md:w-[450px] rounded-sm">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
           Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"} // Toggle between text and password types
                          autoComplete="off"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                          {showPassword ? <EyeOff /> : <Eye />}{" "}
                          {/* Toggle between Eye and EyeOff */}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                {loading ? <Loader /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
