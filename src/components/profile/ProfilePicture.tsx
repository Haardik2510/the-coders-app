
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfilePictureProps {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  username: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const ProfilePicture = ({
  avatarUrl,
  setAvatarUrl,
  username,
  loading,
  setLoading,
}: ProfilePictureProps) => {
  const { toast } = useToast();

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${(await supabase.auth.getUser()).data.user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully",
      });
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
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback>{username?.[0]?.toUpperCase() || '?'}</AvatarFallback>
      </Avatar>
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
          id="avatar-upload"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          disabled={loading}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Picture
        </Button>
      </div>
    </div>
  );
};
