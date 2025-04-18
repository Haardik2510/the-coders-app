
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";

const THEMES = {
  light: {
    background: "bg-white",
    text: "text-gray-900",
  },
  dark: {
    background: "bg-gray-900",
    text: "text-white",
  },
  gryffindor: {
    background: "bg-[#740001]",
    text: "text-[#D3A625]",
  },
  slytherin: {
    background: "bg-[#1A472A]",
    text: "text-[#AAAAAA]",
  },
  ravenclaw: {
    background: "bg-[#0E1A40]",
    text: "text-[#946B2D]",
  },
  hufflepuff: {
    background: "bg-[#FFD800]",
    text: "text-black",
  },
  cyberpunk: {
    background: "bg-[#1A1F2C]",
    text: "text-[#00FF9F]",
  },
} as const;

const NOTIFICATION_MUTE_OPTIONS = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "permanent": -1
};

export const UserSettings = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [muteDuration, setMuteDuration] = useState<string | null>(localStorage.getItem('muteDuration'));
  const [muteEndTime, setMuteEndTime] = useState<number | null>(Number(localStorage.getItem('muteEndTime')) || null);
  const { toast } = useToast();

  useEffect(() => {
    // Apply theme
    const root = document.documentElement;
    root.className = ''; // Clear existing classes
    root.classList.add(THEMES[theme as keyof typeof THEMES].background);
    root.classList.add(THEMES[theme as keyof typeof THEMES].text);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check if mute period has expired
    if (muteEndTime && muteEndTime !== -1 && Date.now() > muteEndTime) {
      localStorage.removeItem('muteDuration');
      localStorage.removeItem('muteEndTime');
      setMuteDuration(null);
      setMuteEndTime(null);
    }
  }, [muteEndTime]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
    });
  };

  const handleNotificationMute = (duration: string) => {
    const now = Date.now();
    const msDuration = NOTIFICATION_MUTE_OPTIONS[duration as keyof typeof NOTIFICATION_MUTE_OPTIONS];
    const endTime = msDuration === -1 ? -1 : now + msDuration;

    setMuteDuration(duration);
    setMuteEndTime(endTime);
    localStorage.setItem('muteDuration', duration);
    localStorage.setItem('muteEndTime', endTime.toString());

    toast({
      title: "Notifications muted",
      description: duration === "permanent" 
        ? "Notifications permanently muted" 
        : `Notifications muted for ${duration}`,
    });
  };

  const getMuteStatus = () => {
    if (!muteEndTime) return "Notifications enabled";
    if (muteEndTime === -1) return "Permanently muted";
    const remainingTime = muteEndTime - Date.now();
    if (remainingTime <= 0) return "Notifications enabled";
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    return `Muted for ${hours} more hour${hours === 1 ? '' : 's'}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Theme</h4>
            <Select onValueChange={handleThemeChange} value={theme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="gryffindor">Gryffindor</SelectItem>
                <SelectItem value="slytherin">Slytherin</SelectItem>
                <SelectItem value="ravenclaw">Ravenclaw</SelectItem>
                <SelectItem value="hufflepuff">Hufflepuff</SelectItem>
                <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium mb-2">Notifications ({getMuteStatus()})</h4>
            <Select onValueChange={handleNotificationMute} value={muteDuration || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Mute notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Mute for 1 hour</SelectItem>
                <SelectItem value="24h">Mute for 24 hours</SelectItem>
                <SelectItem value="permanent">Mute permanently</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
