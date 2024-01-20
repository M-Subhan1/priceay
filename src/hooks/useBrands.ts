import { Brand } from "@/payload/payload-types";
import { PayloadResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  startsWith?: string;
};

export const useBrands = ({ startsWith }: Params) => {
  return useQuery({
    enabled: !!startsWith,
    queryKey: ["brands", startsWith],
    queryFn: async () => {
      if (!startsWith) return Promise.resolve(null);

      const response = await axios.get(
        `/api/brands?limit=10&page=1&where[or][0][and][0][startsWith][equals]=${startsWith.toUpperCase()}`
      );

      return response.data as PayloadResponse<Brand>;
    },
  });
};
