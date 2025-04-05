
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  useSignIn, 
  useSignUp, 
  SignInButton, 
  SignUpButton, 
  useClerk 
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Github, Mail, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Define valid OAuth strategies according to Clerk's types
type OAuthStrategy = "oauth_google" | "oauth_github" | "oauth_facebook" | "oauth_discord" | "oauth_twitter" | "oauth_twitch" | "oauth_linkedin" | "oauth_microsoft" | "oauth_apple";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { signOut } = useClerk();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!isSignUpLoaded) return;
        
        const result = await signUp.create({
          emailAddress: email,
          password,
        });
        
        if (result.status === "complete") {
          await signIn.create({
            identifier: email,
            password,
          });
          toast({
            title: "Success!",
            description: "Account created successfully",
          });
          navigate(-1);
        } else {
          toast({
            title: "Verification needed",
            description: "Please check your email to verify your account.",
          });
        }
      } else {
        if (!isSignInLoaded) return;
        
        const result = await signIn.create({
          identifier: email,
          password,
        });
        
        if (result.status === "complete") {
          toast({
            title: "Success!",
            description: "Signed in successfully",
          });
          navigate(-1);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to sign in. Please check your credentials.",
          });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Authentication failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: OAuthStrategy) => {
    try {
      setLoading(true);
      
      if (!isSignInLoaded) return;
      
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/auth",
        redirectUrlComplete: "/"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Authentication failed",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? '#4e6ef2' : '#ea384c',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float${i % 3} ${2 + Math.random() * 3}s linear infinite`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes float0 {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(100px, -100px) rotate(360deg); }
          }
          @keyframes float1 {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-100px, -100px) rotate(-360deg); }
          }
          @keyframes float2 {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(50px, -150px) rotate(180deg); }
          }
        `}
      </style>
      
      <Card className="w-full max-w-md gradient-card border-none animate-fade-up">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-400">CodersApp by KRMU</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="w-full animated-button animated-button-primary"
              onClick={() => handleOAuthSignIn("oauth_google")}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Google
            </Button>
            <Button 
              className="w-full animated-button animated-button-secondary"
              onClick={() => handleOAuthSignIn("oauth_github")}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
              GitHub
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0c1220] px-2 text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button 
              className="w-full animated-button animated-button-primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              {loading
                ? "Processing..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className="w-full text-gray-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={loading}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Need an account? Sign up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
