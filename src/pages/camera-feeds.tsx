
import { AppLayout } from "@/components/layout/app-layout";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Filter, Grid, LayoutGrid, List, Search } from "lucide-react";

export default function CameraFeedsPage() {
  // Mock camera feeds
  const cameraFeeds = [
    { id: 1, name: "East Entrance", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1568429838920-de3a3aa8cf1c?auto=format&fit=crop&q=80" },
    { id: 2, name: "Main Lobby", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80" },
    { id: 3, name: "Parking Lot", location: "North Side", imageSrc: "https://images.unsplash.com/photo-1621926228881-41722937a37c?auto=format&fit=crop&q=80" },
    { id: 4, name: "Rear Exit", location: "Building B", imageSrc: "https://images.unsplash.com/photo-1629043911430-670c71fc9e51?auto=format&fit=crop&q=80" },
    { id: 5, name: "Conference Room", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1599118558785-8d15e0fb3453?auto=format&fit=crop&q=80" },
    { id: 6, name: "Server Room", location: "Building B", imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80" },
    { id: 7, name: "Cafeteria", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?auto=format&fit=crop&q=80" },
    { id: 8, name: "Reception", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1519219788971-8d9797e0928e?auto=format&fit=crop&q=80" },
    { id: 9, name: "Hallway B3", location: "Building B", imageSrc: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&q=80" },
    { id: 10, name: "Emergency Exit", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" },
    { id: 11, name: "Loading Dock", location: "Building B", imageSrc: "https://images.unsplash.com/photo-1578827372399-981c1e0e08ce?auto=format&fit=crop&q=80" },
    { id: 12, name: "Main Gate", location: "Entrance", imageSrc: "https://images.unsplash.com/photo-1531972111231-7482a960e109?auto=format&fit=crop&q=80" },
  ];

  // Layout options
  const layoutOptions = [
    { value: "2x2", label: "2x2 Grid", cols: "grid-cols-1 md:grid-cols-2" },
    { value: "3x2", label: "3x2 Grid", cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
    { value: "4x3", label: "4x3 Grid", cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
  ];

  const [layout, setLayout] = useState(layoutOptions[2]);
  const [expandedCamera, setExpandedCamera] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <AppLayout title="Camera Feeds" subtitle="Real-time monitoring of all connected cameras">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            {layoutOptions.map((option) => (
              <Button
                key={option.value}
                variant={layout.value === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout(option)}
                className="flex items-center"
              >
                {option.value === "2x2" && <Grid className="h-4 w-4 mr-2" />}
                {option.value === "3x2" && <LayoutGrid className="h-4 w-4 mr-2" />}
                {option.value === "4x3" && <List className="h-4 w-4 mr-2" />}
                {option.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Input 
                type="search" 
                placeholder="Search cameras..." 
                className="bg-surveil-dark-300 border-surveil-dark-200 pr-8 w-full sm:w-60"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] bg-surveil-dark-300 border-surveil-dark-200">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-surveil-dark-300 border-surveil-dark-200">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="building-a">Building A</SelectItem>
                <SelectItem value="building-b">Building B</SelectItem>
                <SelectItem value="entrance">Entrances</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Camera Grid */}
        <div className={`grid ${layout.cols} gap-4`}>
          {cameraFeeds.map((camera) => (
            <CameraFeed
              key={camera.id}
              {...camera}
              onExpand={() => {
                setExpandedCamera(camera.id);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>

        {/* Expanded Camera Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-5xl bg-surveil-dark-400 border-surveil-dark-300">
            <DialogHeader>
              <DialogTitle>
                {expandedCamera !== null && 
                  cameraFeeds.find(cam => cam.id === expandedCamera)?.name
                }
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                {expandedCamera !== null && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={cameraFeeds.find(cam => cam.id === expandedCamera)?.imageSrc}
                      alt="Camera feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 live-indicator">
                      LIVE
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Card className="neumorph">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Camera Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {expandedCamera !== null && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Camera ID:</span>
                          <span>CAM #{expandedCamera}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>
                            {cameraFeeds.find(cam => cam.id === expandedCamera)?.location}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="flex items-center">
                            <div className="status-dot text-surveil-green-500 mr-1"></div>
                            Online
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution:</span>
                          <span>1080p</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frame Rate:</span>
                          <span>30fps</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="neumorph">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Crowd Density:</span>
                      <div className="w-32 h-2 bg-surveil-dark-300 rounded-full overflow-hidden">
                        <div className="h-full bg-surveil-blue-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Movement:</span>
                      <div className="w-32 h-2 bg-surveil-dark-300 rounded-full overflow-hidden">
                        <div className="h-full bg-surveil-green-500" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Faces Detected:</span>
                      <span>4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-surveil-blue-500/20 text-surveil-blue-400">
                        Low
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">View PTZ Controls</Button>
                  <Button variant="outline" className="flex-1">View History</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
