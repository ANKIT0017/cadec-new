import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const GitHubLoginButton: React.FC = () => {
  const handleGitHubLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/api/auth/github`;
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGitHubLogin}
    >
      <Github className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  );
};

export default GitHubLoginButton;
