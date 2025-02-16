import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

function Dashboard() {
  const {
    coordinates,
    isLoading: locationLoading,
    error: locationError,
    geoLocation,
  } = useGeoLocation();

  const handleRefresh = () => {
    geoLocation();
  };

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>Your Location not Found.</AlertDescription>
        <Button variant={"outline"} onClick={geoLocation} className="w-fit">
          <MapPin className="mr-4 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          Please enable the location permission to see the weather of your
          location.
        </AlertDescription>
        <Button variant={"outline"} onClick={geoLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
