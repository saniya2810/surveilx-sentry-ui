
import { AppLayout } from "@/components/layout/app-layout";
import { CameraFeed } from "@/components/dashboard/camera-feed";
import { AlertCard } from "@/components/dashboard/alert-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EmergencyButton, EmergencyCallButton } from "@/components/dashboard/emergency-button";
import { RecognitionMatch } from "@/components/dashboard/recognition-match";
import { useEffect, useState } from "react";
import { 
  Bell, 
  BarChart3, 
  Camera, 
  Clock, 
  UserCheck, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Speaker,
  Megaphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [highlightedCamera, setHighlightedCamera] = useState<number | null>(null);

  // Mock camera feeds
  const cameraFeeds = [
    { id: 1, name: "East Entrance", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1568429838920-de3a3aa8cf1c?auto=format&fit=crop&q=80" },
    { id: 2, name: "Main Lobby", location: "Building A", imageSrc: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80" },
    { id: 3, name: "Parking Lot", location: "North Side", imageSrc: "https://images.unsplash.com/photo-1621926228881-41722937a37c?auto=format&fit=crop&q=80" },
    { id: 4, name: "Rear Exit", location: "Building B", imageSrc: "https://images.unsplash.com/photo-1629043911430-670c71fc9e51?auto=format&fit=crop&q=80" },
  ];

  // Mock alerts
  const alerts = [
    { 
      title: "Unauthorized Access", 
      description: "Unidentified individual attempting to access secure area.", 
      timestamp: "2 mins ago", 
      severity: "critical", 
      location: "East Entrance", 
      camera: "CAM #1"
    },
    { 
      title: "Crowd Density Alert", 
      description: "Unusual gathering detected in lobby area.", 
      timestamp: "15 mins ago", 
      severity: "high", 
      location: "Main Lobby", 
      camera: "CAM #2" 
    },
    { 
      title: "System Update", 
      description: "New facial recognition database update available.", 
      timestamp: "1 hour ago", 
      severity: "medium", 
      location: "System", 
      camera: undefined
    },
  ];

  // Mock recognition matches
  const recognitionMatches = [
    {
      name: "John Smith",
      matchTime: "09:45 AM Today",
      confidenceScore: 98,
      status: "match",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
      location: "East Entrance",
      cameraId: "CAM #1",
    },
    {
      name: "Unknown Person",
      matchTime: "09:32 AM Today",
      confidenceScore: 62,
      status: "alert",
      imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=200&h=200",
      location: "Rear Exit",
      cameraId: "CAM #4",
    },
  ];

  // Simulate an alert after the component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlightedCamera(4); // Highlight the camera with id 4 after a delay
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout title="Dashboard" subtitle="System overview and real-time monitoring">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Camera Feeds - Left Side */}
        <div className="xl:col-span-3 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {cameraFeeds.map((camera) => (
              <CameraFeed
                key={camera.id}
                {...camera}
                highlighted={camera.id === highlightedCamera}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard
              title="Active Cameras"
              value="12/15"
              description="3 offline"
              icon={<Camera className="h-4 w-4" />}
            />
            <StatsCard
              title="Current Visitors"
              value="284"
              trend="up"
              trendValue="12%"
              description="vs. yesterday"
              icon={<Users className="h-4 w-4" />}
            />
            <StatsCard
              title="Identifications Today"
              value="42"
              icon={<UserCheck className="h-4 w-4" />}
            />
            <StatsCard
              title="Average Response Time"
              value="1m 12s"
              trend="down"
              trendValue="8%"
              description="Improved"
              icon={<Clock className="h-4 w-4" />}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="neumorph col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Crowd Density Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                {/* Placeholder for crowd density chart */}
                <div className="text-center text-muted-foreground">
                  <p>Crowd Density Visualization</p>
                  <p className="text-sm">(Chart visualization would go here)</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neumorph">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Facial Recognition</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Analytics Engine</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-warning mr-2"></div>
                      <span className="text-sm">Notification System</span>
                    </div>
                    <span className="text-xs text-surveil-warning">Degraded</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="status-dot text-surveil-green-500 mr-2"></div>
                      <span className="text-sm">Voice Interface</span>
                    </div>
                    <span className="text-xs text-surveil-green-500">Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Emergency Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <EmergencyCallButton />
            <EmergencyButton 
              icon={<Megaphone className="mr-2 h-4 w-4" />}
              label="Evacuate"
              className="bg-surveil-warning hover:bg-surveil-warning/90"
            />
          </div>
          
          {/* Recent Alerts */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Recent Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <AlertCard
                  key={index}
                  title={alert.title}
                  description={alert.description}
                  timestamp={alert.timestamp}
                  severity={alert.severity as any}
                  location={alert.location}
                  camera={alert.camera}
                />
              ))}
            </div>
          </div>
          
          {/* Facial Recognition */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Recent Identifications
            </h3>
            <div className="space-y-4">
              {recognitionMatches.map((match, index) => (
                <RecognitionMatch
                  key={index}
                  name={match.name}
                  matchTime={match.matchTime}
                  confidenceScore={match.confidenceScore}
                  status={match.status as any}
                  imageSrc={match.imageSrc}
                  location={match.location}
                  cameraId={match.cameraId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
