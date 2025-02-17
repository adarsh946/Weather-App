import { useCityLocationQuery } from "@/hooks/useWeather";
import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

function SearchCity() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { data: location, isLoading } = useCityLocationQuery(query);

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
        <CommandInput placeholder="Search cities..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCity;
