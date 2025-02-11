
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
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <Mic className="h-4 w-4" />
              </div>
              <audio controls className="max-w-full h-10">
                <source src={content} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        );
      case 'file':
        return (
          <a 
            href={content} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-blue-400 hover:underline"
          >
            <Upload className="h-4 w-4" />
            <span>Attachment</span>
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
          "max-w-[70%] rounded-2xl px-4 py-2",
          isSender 
            ? "bg-primary text-white" 
            : "bg-gray-800 text-white"
        )}
      >
        {renderContent()}
        <div className="mt-1 text-xs opacity-70 flex justify-end">
          {new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
