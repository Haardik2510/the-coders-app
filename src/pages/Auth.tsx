
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Loader2, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import ReCAPTCHA from "react-google-recaptcha";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast({
        variant: "destructive",
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification to proceed.",
      });
      return;
    }
    
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            captchaToken,
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Account created. Please check your email for verification.",
        });
        
        if (data.session) {
          navigate(-1);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Signed in successfully",
        });
        
        navigate(-1);
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

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1220] to-[#1e293b] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="turbulence" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="3"
              seed="3"
              stitchTiles="stitch"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                from="0.01 0.01"
                to="0.02 0.02"
                dur="30s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
            filter="url(#turbulence)"
          />
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e6ef2" />
            <stop offset="50%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#ea384c" />
          </linearGradient>
        </svg>
      </div>
      
      <Card className="w-full max-w-md gradient-card border-none animate-fade-up">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-400">CodersApp by KRMU</p>
        </CardHeader>
        <CardContent className="space-y-4">
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
            
            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
                theme="dark"
              />
            </div>
            
            <Button 
              className="w-full animated-button animated-button-primary" 
              type="submit" 
              disabled={loading || !captchaToken}
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
