
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isPending: boolean;
}

const ChatInput = ({ newMessage, setNewMessage, onSendMessage, isPending }: ChatInputProps) => {
  return (
    <form onSubmit={onSendMessage} className="mt-4 flex space-x-2">
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-gray-900 border-gray-800 text-white"
      />
      <Button 
        type="submit" 
        disabled={isPending || !newMessage.trim()}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Send'
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
