import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";

export interface FavouriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export const useFavourites = () => {
  const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
    "favourites",
    []
  );

  const queryClient = useQueryClient();

  const favouritesquery = useQuery({
    queryKey: ["favourites"],
    queryFn: async () => favourites,
    initialData: favourites,
    staleTime: Infinity, // because data is stored on localstorage
  });

  const addFavourites = useMutation({
    mutationFn: async (city: Omit<FavouriteCity, "id" | "addedAt">) => {
      const newCity = {
        ...city,
        id: `${city.lat}-${city.lon}}`,
        addedAt: Date.now(),
      };

      const exists = favourites.some(
        (fav: { id: string }) => fav.id === newCity.id
      );
      if (exists) return favourites;

      const newFavourites = [...favourites, newCity];
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  const removeFavourites = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavourites = favourites.filter(
        (city: { id: string }) => city.id != cityId
      );
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: async () => {
      //Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  return {
    favourites: favouritesquery.data,
    addFavourites,
    removeFavourites,
    isFavourite: (lat: number, lon: number) => {
      return favourites.some(
        (fav: { lat: number; lon: number }) =>
          fav.lat === lat && fav.lon === lon
      );
    },
  };
};
