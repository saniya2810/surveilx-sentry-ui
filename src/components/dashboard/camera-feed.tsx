
import { Card, CardContent } from "@/components/ui/card";
import { Expand, MoreVertical, Volume, VolumeX } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CameraFeedProps {
  id: number;
  name: string;
  location: string;
  imageSrc: string;
  live?: boolean;
  highlighted?: boolean;
  onExpand?: () => void;
}

export function CameraFeed({ 
  id, 
  name, 
  location, 
  imageSrc, 
  live = true,
  highlighted = false,
  onExpand
}: CameraFeedProps) {
  const [muted, setMuted] = useState(true);

  return (
    <Card className={cn(
      "overflow-hidden neumorph h-full transition-all duration-300",
      highlighted && "ring-2 ring-surveil-emergency animate-pulse"
    )}>
      <CardContent className="p-0 relative">
        {/* Camera Feed Image */}
        <div className="aspect-video relative overflow-hidden bg-black">
          <img 
            src={imageSrc} 
            alt={`Camera feed from ${name}`} 
            className="w-full h-full object-cover" 
          />
          
          {/* Live Indicator */}
          {live && (
            <div className="absolute top-2 left-2 live-indicator">
              LIVE
            </div>
          )}
          
          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
            <div>
              <p className="text-white text-sm font-medium truncate">{name}</p>
              <p className="text-gray-300 text-xs truncate">{location}</p>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={onExpand}
              >
                <Expand className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Camera ID Badge */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            CAM #{id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
