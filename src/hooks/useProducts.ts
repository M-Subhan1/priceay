import { Product } from "@/payload/payload-types";
import { PayloadResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  query?: string;
};

export const useProducts = ({ query }: Params) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      if (!query) return Promise.resolve(null);

      const response = await axios.get(
        `/api/products?limit=25&page=1&where[nameEnglish][like]=${query}`
      );

      return response.data as PayloadResponse<Product>;
    },
  });
};
