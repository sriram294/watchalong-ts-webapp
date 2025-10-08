import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_BASE } from "@/config";
import { Film } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  const handleGoogleLogin = () => {
          window.location.href = `${BACKEND_BASE}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Film className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-display" data-testid="text-login-title">MovieShare</CardTitle>
          <CardDescription data-testid="text-login-description">
            Discover and share movies with friends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full h-12 gap-2" 
            variant="outline" 
            size="lg"
            onClick={handleGoogleLogin}
            data-testid="button-google-login"
          >
            <SiGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
