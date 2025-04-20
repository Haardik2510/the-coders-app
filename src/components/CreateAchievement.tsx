
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Code, Image, Video, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const CreateAchievement = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"post" | "story">("post");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    
    checkAuth();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image or video
    if (file.type.startsWith("image/")) {
      setMediaType("image");
      setMediaFile(file);
    } else if (file.type.startsWith("video/")) {
      setMediaType("video");
      setMediaFile(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image or video file.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!isAuthenticated) {
        throw new Error("You must be logged in to create an achievement");
      }

      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to create an achievement");
      }

      let mediaUrl = null;

      // Upload media file if one was selected
      if (mediaFile) {
        const fileName = `${user.id}-${Date.now()}-${mediaFile.name}`;
        const filePath = `${mediaType === "image" ? "images" : "videos"}/${fileName}`;

        try {
          // Upload the file
          const { error: uploadError, data } = await supabase.storage
            .from("achievements")
            .upload(filePath, mediaFile, {
              cacheControl: "3600",
              upsert: false
            });

          if (uploadError) {
            console.error("Upload error details:", uploadError);
            throw new Error(`Upload failed: ${uploadError.message}`);
          }

          // Get public URL for the uploaded file
          const { data: { publicUrl } } = supabase.storage
            .from("achievements")
            .getPublicUrl(filePath);

          mediaUrl = publicUrl;
        } catch (uploadErr: any) {
          console.error("Media upload error:", uploadErr);
          throw new Error(`Media upload failed: ${uploadErr.message}`);
        }
      }

      // Create the achievement with media info if available
      const { error } = await supabase.from("achievements").insert({
        title,
        description,
        type,
        user_id: user.id,
        media_url: mediaUrl,
        media_type: mediaType
      });

      if (error) {
        console.error("Insert error details:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      toast({
        title: "Success!",
        description: `Your ${type} has been created.`,
      });

      setTitle("");
      setDescription("");
      setMediaFile(null);
      setMediaType(null);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Achievement creation error:", error);
      setErrorMessage(error.message || "Failed to create achievement");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create achievement",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-black text-white border-none">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={type === "post" ? "default" : "outline"}
              onClick={() => setType("post")}
              className={type === "post" ? "" : "text-white bg-white/10 hover:bg-white/20 border-none"}
            >
              Post
            </Button>
            <Button
              type="button"
              variant={type === "story" ? "default" : "outline"}
              onClick={() => setType("story")}
              className={type === "story" ? "" : "text-white bg-white/10 hover:bg-white/20 border-none"}
            >
              Story
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAuthenticated && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You must be logged in to create achievements. Please sign in first.
              </AlertDescription>
            </Alert>
          )}
          
          {errorMessage && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              required
              className="bg-white/10 border-none text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="bg-white/10 border-none text-white min-h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media" className="text-white">Media (optional)</Label>
            <div className="flex gap-4 mb-2">
              <Button 
                type="button"
                variant={mediaType === "image" ? "default" : "outline"}
                onClick={() => document.getElementById('media-upload')?.click()}
                className="flex items-center gap-2"
                disabled={!isAuthenticated}
              >
                <Image className="w-4 h-4" />
                {mediaType === "image" ? "Image Selected" : "Add Image"}
              </Button>
              <Button 
                type="button"
                variant={mediaType === "video" ? "default" : "outline"}
                onClick={() => document.getElementById('media-upload')?.click()}
                className="flex items-center gap-2"
                disabled={!isAuthenticated}
              >
                <Video className="w-4 h-4" />
                {mediaType === "video" ? "Video Selected" : "Add Video"}
              </Button>
            </div>
            <Input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={!isAuthenticated}
            />
            {mediaFile && (
              <div className="bg-white/5 p-2 rounded-md">
                <p className="text-sm text-white truncate">{mediaFile.name}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isLoading || !isAuthenticated} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              `Create ${type}`
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateAchievement;
