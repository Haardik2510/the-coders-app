
import { useState, useRef } from "react";
import { Loader2, Mic, MicOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isPending: boolean;
  currentUser: string;
  selectedUserId: string;
}

const ChatInput = ({ 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  isPending,
  currentUser,
  selectedUserId
}: ChatInputProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await handleVoiceUpload(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceUpload = async (audioBlob: Blob) => {
    try {
      const filePath = `${currentUser}/${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('chat_attachments')
        .upload(filePath, audioBlob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat_attachments')
        .getPublicUrl(filePath);

      // Create a new message with the voice attachment
      await supabase.from('messages').insert({
        content: publicUrl,
        sender_id: currentUser,
        receiver_id: selectedUserId,
        attachment_type: 'voice'
      });

      toast({
        title: "Success",
        description: "Voice message sent successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const filePath = `${currentUser}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('chat_attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat_attachments')
        .getPublicUrl(filePath);

      // Create a new message with the file attachment
      await supabase.from('messages').insert({
        content: publicUrl,
        sender_id: currentUser,
        receiver_id: selectedUserId,
        attachment_type: 'file',
      });

      toast({
        title: "Success",
        description: "File sent successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={onSendMessage} className="mt-4 flex items-center space-x-2">
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-5 w-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <MicOff className="h-5 w-5 text-red-500" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-gray-900 border-gray-800 text-white"
      />
      <Button 
        type="submit" 
        disabled={isPending || (!newMessage.trim() && !isRecording)}
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
