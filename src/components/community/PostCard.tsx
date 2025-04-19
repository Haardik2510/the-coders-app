
import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: {
    id: number;
    user: {
      name: string;
      avatar: string;
      handle: string;
    };
    content: string;
    likes: number;
    comments: number;
    tags: string[];
  };
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="border-none bg-black text-white">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={post.user.avatar} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-white text-base">{post.user.name}</CardTitle>
          <CardDescription className="text-gray-400">{post.user.handle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-white">
        <p>{post.content}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-none">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-gray-400">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
          <Heart className="h-4 w-4 mr-1" />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
          <MessageSquare className="h-4 w-4 mr-1" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
