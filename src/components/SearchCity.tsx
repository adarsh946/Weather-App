import { useCityLocationQuery } from "@/hooks/useWeather";
import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Button } from "./ui/button";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchHistoryItem, useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { FavouriteCity, useFavourites } from "@/hooks/useFavourites";

function SearchCity() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: location, isLoading } = useCityLocationQuery(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { favourites } = useFavourites();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    // add to history
    addToHistory.mutate({
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      query,
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative text-sm w-full text-muted-foreground justify-start sm:pr-12 md:w-50 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-1" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}

          {favourites.length > 0 && (
            <CommandGroup heading="Favourites">
              {favourites.map((city: FavouriteCity) => (
                <CommandItem
                  key={city.id}
                  value={`${city.lat} | ${city.lon} | ${city.name} | ${city.country}`}
                  onSelect={handleSelect}
                >
                  <Star className=" mr-2 h-4 w-4 gap-3 text-yellow-500" />
                  <span>{city.name}</span>
                  {city.state && (
                    <span className="text-sm text-muted-foreground">
                      , {city.state}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    , {city.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    clear
                  </Button>
                </div>
                {history.map((item: SearchHistoryItem) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat} | ${item.lon} | ${item.name} | ${item.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className=" mr-2 h-4 w-4 gap-3 text-muted-foreground" />
                    <span>{item.name}</span>
                    {item.state && (
                      <span className="text-sm text-muted-foreground">
                        , {item.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {item.country}
                    </span>
                    <span className="ml-auto text-muted-foreground text-xs">
                      {format(item.searchedAt, "MMM d, h:mm a")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex justify-center items-center p-4">
                  <Loader2 className="h-4 w-4" />
                </div>
              )}
              {location.map((locations) => (
                <CommandItem
                  value={`${locations.lat} | ${locations.lon} | ${locations.name} | ${locations.country}`}
                  onSelect={handleSelect}
                >
                  <Search className=" mr-2 h-4 w-4 gap-3" />
                  <span>{locations.name}</span>
                  {locations.state && (
                    <span className="text-sm text-muted-foreground">
                      , {locations.state}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    , {locations.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCity;
