
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isSender: boolean;
  timestamp: string;
  attachmentType?: 'text' | 'voice' | 'file';
}

const ChatMessage = ({ content, isSender, timestamp, attachmentType = 'text' }: ChatMessageProps) => {
  const renderContent = () => {
    switch (attachmentType) {
      case 'voice':
        return (
          <audio controls className="max-w-full">
            <source src={content} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        );
      case 'file':
        return (
          <a 
            href={content} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline"
          >
            📎 Attachment
          </a>
        );
      default:
        return <p className="break-words">{content}</p>;
    }
  };

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
        {renderContent()}
        <span className="mt-1 text-xs opacity-70">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
