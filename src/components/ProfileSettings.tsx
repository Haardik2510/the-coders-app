
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProfilePicture } from "./profile/ProfilePicture";
import { ProfileForm } from "./profile/ProfileForm";
import { PasswordChange } from "./profile/PasswordChange";

interface ProfileSettingsProps {
  onClose: () => void;
  profile: {
    username: string | null;
    full_name: string | null;
    age: number | null;
    date_of_birth: string | null;
    gender: string | null;
    avatar_url: string | null;
  };
}

const ProfileSettings = ({ onClose, profile }: ProfileSettingsProps) => {
  const [username, setUsername] = useState(profile.username || "");
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [age, setAge] = useState(profile.age?.toString() || "");
  const [dateOfBirth, setDateOfBirth] = useState(profile.date_of_birth || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasChanges = 
      username !== (profile.username || "") ||
      fullName !== (profile.full_name || "") ||
      age !== (profile.age?.toString() || "") ||
      dateOfBirth !== (profile.date_of_birth || "") ||
      gender !== (profile.gender || "") ||
      avatarUrl !== (profile.avatar_url || "");
    
    setHasUnsavedChanges(hasChanges);
  }, [username, fullName, age, dateOfBirth, gender, avatarUrl, profile]);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
    }
  };

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
          avatar_url: avatarUrl,
        })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setHasUnsavedChanges(false);
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

  return (
    <>
      <ScrollArea className="h-[80vh] pr-4">
        <div className="space-y-4 p-4">
          <ProfilePicture
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            username={username}
            loading={loading}
            setLoading={setLoading}
          />

          <ProfileForm
            username={username}
            setUsername={setUsername}
            fullName={fullName}
            setFullName={setFullName}
            age={age}
            setAge={setAge}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            gender={gender}
            setGender={setGender}
          />

          <PasswordChange loading={loading} setLoading={setLoading} />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </div>
        </div>
      </ScrollArea>

      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save them before closing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowUnsavedDialog(false);
              onClose();
            }}>
              Discard
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateProfile}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileSettings;
