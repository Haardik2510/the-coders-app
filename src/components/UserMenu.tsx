
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileSettings from "@/components/ProfileSettings";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  age: number | null;
  date_of_birth: string | null;
  gender: string | null;
}

interface UserMenuProps {
  currentUserProfile: Profile | null;
  showProfileSettings: boolean;
  setShowProfileSettings: (show: boolean) => void;
  onLogout: () => void;
}

const UserMenu = ({ currentUserProfile, showProfileSettings, setShowProfileSettings, onLogout }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-2">
      {currentUserProfile?.username && (
        <span className="text-sm font-medium">{currentUserProfile.username}</span>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Sheet open={showProfileSettings} onOpenChange={setShowProfileSettings}>
            <SheetTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Profile Settings
              </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Profile Settings</SheetTitle>
              </SheetHeader>
              {currentUserProfile && (
                <ProfileSettings
                  profile={currentUserProfile}
                  onClose={() => setShowProfileSettings(false)}
                  onProfileUpdate={(updatedProfile) => {
                    // Force a re-render with the updated profile
                    window.location.reload();
                  }}
                />
              )}
            </SheetContent>
          </Sheet>
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
