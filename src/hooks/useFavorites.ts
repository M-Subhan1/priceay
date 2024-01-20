import { Product } from "@/payload/payload-types";
import { PayloadResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage(
    "favorites",
    [] as string[]
  );

  const addToFavorites = (id: string) => {
    return setFavorites(Array.from(new Set(favorites.concat([id]))));
  };

  const isFavorite = (id: string) => {
    return favorites.find((p) => p === id);
  };

  const removeFromFavorites = (id: string) => {
    return setFavorites(favorites.filter((p) => p !== id));
  };

  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return {
    favorites,
    isFavorite,
    addToFavorites,
    toggleFavorite,
    removeFromFavorites,
  };
};

export const useFavoriteProducts = (ids: string[]) => {
  return useQuery({
    queryKey: ["favorites", ids],
    queryFn: async () => {
      if (ids.length === 0) return undefined;

      const response = await axios.get(
        `/api/products?limit=25&page=1&where[id][in]=${ids}`
      );

      const data = response.data as PayloadResponse<Product>;
      return data;
    },
  });
};
