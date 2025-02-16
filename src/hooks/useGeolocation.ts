import type { Coordinates } from "@/config/types";
import { useEffect, useState } from "react";

interface geoLocationData {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<geoLocationData>({
    coordinates: null,
    error: null,
    isLoading: false,
  });

  const geoLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Your Location data not found by the browser.",
        isLoading: true,
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },

      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "location permission is denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "location information is unavalable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request Timed out";
            break;
          default:
            errorMessage = "An unknown error occured";
            break;
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // get location data when component mounts
  useEffect(() => {
    geoLocation();
  }, []);

  return {
    ...locationData,
    geoLocation, // method to manully refresh location
  };
};
