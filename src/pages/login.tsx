
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Camera, Shield, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-surveil-dark-400">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <Camera className="h-16 w-16 text-surveil-blue-500" />
              <Shield className="h-8 w-8 text-surveil-green-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">SurveilX</h1>
          <p className="text-gray-400 mt-1">AI-Powered Integrated Surveillance System</p>
        </div>

        <Card className="w-full neumorph border-surveil-dark-300">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  required 
                  className="bg-surveil-dark-300 border-surveil-dark-200"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-surveil-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-surveil-blue-600 hover:bg-surveil-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </>
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <Button variant="outline" className="w-full">
                  Login with SSO
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 SurveilX. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/terms" className="text-surveil-blue-400 hover:underline mr-4">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-surveil-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
