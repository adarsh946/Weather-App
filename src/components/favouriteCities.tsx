import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useWeatherQuery } from "@/hooks/useWeather";
import { useFavourites } from "@/hooks/useFavourites";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface FavouriteCityProps {
  id: string;
  name: string;
  lat: number;
  lon: number;

  onRemove: (city: string) => void;
}

const FavouriteCityTab = ({
  id,
  name,
  lat,
  lon,

  onRemove,
}: FavouriteCityProps) => {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}?lon=${lon}`);
  };

  return (
    <div onClick={handleClick} role="button" tabIndex={0}>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favourites.`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      {isLoading ? (
        <div>
          <Loader2 className="h-4 w-4" />
        </div>
      ) : weather ? (
        <>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
            />
            <div>
              <p>{weather.name}</p>
              <p>{weather.sys.country}</p>
            </div>
          </div>
          <div>
            <p>{weather.main.temp}°</p>
            <p>{weather.weather[0].description}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

function FavouriteCities() {
  const { favourites, removeFavourites } = useFavourites();
  if (!favourites.length) return null;
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favourites</h1>
      <ScrollArea>
        <div className="flex gap-4">
          {favourites.map((city: FavouriteCityProps) => (
            <FavouriteCityTab
              key={city.id}
              {...city}
              onRemove={() => removeFavourites.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}

export default FavouriteCities;
