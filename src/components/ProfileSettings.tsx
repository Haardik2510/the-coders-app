
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ProfileSettingsProps {
  onClose: () => void;
  profile: {
    username: string | null;
    full_name: string | null;
    age: number | null;
    date_of_birth: string | null;
    gender: string | null;
  };
}

const ProfileSettings = ({ onClose, profile }: ProfileSettingsProps) => {
  const [username, setUsername] = useState(profile.username || "");
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [age, setAge] = useState(profile.age?.toString() || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile.date_of_birth || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          age: age ? parseInt(age) : null,
          date_of_birth: dateOfBirth || null,
          gender: gender || null,
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      onClose();
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
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Username</label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Date of Birth</label>
        <Input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Gender</label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
