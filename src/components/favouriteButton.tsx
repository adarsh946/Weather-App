import type { WeatherData } from "@/config/types";
import { useFavourites } from "@/hooks/useFavourites";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export interface FavouriteButtonProp {
  data: WeatherData;
}

const FavouriteButton = ({ data }: FavouriteButtonProp) => {
  const { addFavourites, removeFavourites, isFavourite } = useFavourites();
  const currentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);

  const handleToggle = () => {
    if (currentlyFavourite) {
      removeFavourites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from the Favourites.`);
    } else {
      addFavourites.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favourites.`);
    }
  };
  return (
    <Button
      variant={currentlyFavourite ? "default" : "outline"}
      size="icon"
      onClick={handleToggle}
      className={currentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star className={`h-4 w-4 ${currentlyFavourite ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavouriteButton;
