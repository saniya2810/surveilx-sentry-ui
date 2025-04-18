
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
import { Camera, Shield, Lock, LogIn, UserPlus, Mail } from "lucide-react";
import { toast } from 'sonner';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setIsLoading(true);
    // Simulate signup process
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
          <p className="text-gray-400 mt-1">Create your account</p>
        </div>

        <Card className="w-full neumorph border-surveil-dark-300">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                  <UserPlus className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="bg-surveil-dark-300 border-surveil-dark-200"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-surveil-blue-600 hover:bg-surveil-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-surveil-blue-400 hover:underline">
                  Log in
                </Link>
              </p>
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
