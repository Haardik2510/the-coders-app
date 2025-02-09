
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isSender: boolean;
  timestamp: string;
}

const ChatMessage = ({ content, isSender, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full space-x-2 p-2",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-2",
          isSender ? "bg-primary text-white" : "bg-gray-900 text-white"
        )}
      >
        <p className="break-words">{content}</p>
        <span className="mt-1 text-xs opacity-70">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
