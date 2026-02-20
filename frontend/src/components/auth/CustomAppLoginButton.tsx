import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const CustomAppLoginButton: React.FC = () => {
  const handleCustomAppLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/api/auth/custom-app`;
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleCustomAppLogin}
    >
      <Users className="mr-2 h-4 w-4" />
      Continue with YourApp
    </Button>
  );
};

export default CustomAppLoginButton;



