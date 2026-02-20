import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast({
        title: "Authentication Error",
        description: "OAuth authentication failed. Please try again.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (token) {
      // Store token and redirect
      localStorage.setItem('token', token);
      window.location.reload(); // This will trigger the auth context to fetch user info
    } else {
      navigate('/');
    }
  }, [searchParams, navigate, toast, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Completing Authentication</h2>
        <p className="text-muted-foreground">Please wait while we log you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
