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
import { Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchCity() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: location, isLoading } = useCityLocationQuery(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    setOpen(false);
    navigate(`/city/?${name}??at=${lat}&lon=${lon}`);
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

          <CommandGroup heading="Favouraites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Searches">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
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
