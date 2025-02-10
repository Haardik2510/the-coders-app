
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface PasswordChangeProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const PasswordChange = ({ loading, setLoading }: PasswordChangeProps) => {
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setNewPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">New Password</label>
      <Input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <Button
        className="w-full"
        onClick={handleUpdatePassword}
        disabled={loading || !newPassword}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
      </Button>
    </div>
  );
};
