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
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className="relative min-w-[250px] flex items-center cursor-pointer rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favourites.`);
        }}
      >
        <X className="h-4 w-4 " />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{weather.name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-bold">{weather.main.temp}°</p>
            <p className="text-xs text-muted-foreground capitalize">
              {weather.weather[0].description}
            </p>
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
