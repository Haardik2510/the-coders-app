
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileFormProps {
  username: string;
  setUsername: (username: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  age: string;
  setAge: (age: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (dateOfBirth: string) => void;
  gender: string;
  setGender: (gender: string) => void;
}

export const ProfileForm = ({
  username,
  setUsername,
  fullName,
  setFullName,
  age,
  setAge,
  dateOfBirth,
  setDateOfBirth,
  gender,
  setGender,
}: ProfileFormProps) => {
  return (
    <>
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
    </>
  );
};
