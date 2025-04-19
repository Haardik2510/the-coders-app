
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    attendees: number;
    type: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="gradient-card border-none bg-[#1a1f2c]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-white">{event.title}</CardTitle>
          <Badge variant="outline" className="bg-white/10 text-white border-none">
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full animated-button animated-button-primary">
          Join Event
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
