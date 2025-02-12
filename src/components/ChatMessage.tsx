import { cn } from "@/lib/utils";
import { Mic, Upload, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChatMessageProps {
  content: string;
  isSender: boolean;
  timestamp: string;
  attachmentType?: 'text' | 'voice' | 'file';
  messageId: string;
  currentUserId: string;
}

const ChatMessage = ({ content, isSender, timestamp, attachmentType = 'text', messageId, currentUserId }: ChatMessageProps) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSpeedChange = () => {
    if (playbackSpeed === 1) {
      setPlaybackSpeed(1.5);
      if (audioRef.current) audioRef.current.playbackRate = 1.5;
    } else if (playbackSpeed === 1.5) {
      setPlaybackSpeed(2);
      if (audioRef.current) audioRef.current.playbackRate = 2;
    } else {
      setPlaybackSpeed(1);
      if (audioRef.current) audioRef.current.playbackRate = 1;
    }
  };

  const handlePlayStateChange = () => {
    setIsPlaying(!audioRef.current?.paused);
  };

  const handleDeleteMessage = async () => {
    try {
      setIsDeleting(true);
      const { error } = await supabase.from('messages')
        .update({ deleted_by: supabase.sql`array_append(COALESCE(deleted_by, array[]::uuid[]), ${currentUserId}::uuid)` })
        .eq('id', messageId);

      if (error) throw error;

      toast({
        title: "Message deleted",
        description: "The message has been deleted for you.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    switch (attachmentType) {
      case 'voice':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleSpeedChange}
                className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-white"
              >
                {playbackSpeed}x
              </button>
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isPlaying ? "bg-red-500" : "bg-blue-400"
                )}
              >
                <Mic className="h-4 w-4" />
              </div>
              <audio 
                ref={audioRef}
                controls 
                className="max-w-full h-10"
                onPlay={handlePlayStateChange}
                onPause={handlePlayStateChange}
              >
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
          "max-w-[70%] rounded-2xl px-4 py-2 relative group",
          isSender 
            ? "bg-primary text-white" 
            : "bg-gray-800 text-white"
        )}
      >
        {renderContent()}
        <div className="mt-1 text-xs opacity-70 flex justify-between items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                <AlertDialogDescription>
                  This message will be deleted for you. Other users will still be able to see it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteMessage} disabled={isDeleting}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <span>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
