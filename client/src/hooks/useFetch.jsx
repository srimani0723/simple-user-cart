import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const fetchData = async ({ url, method, data, headers }) => {
  const config = { url, method, headers };

  if (data !== null && data !== undefined) {
    config.data = data;
  }

  return await instance(config);
};

const useFetch = ({
  url,
  method = "GET",
  data,
  headers = { "Content-Type": "application/json" },
}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [url],
    queryFn: () => fetchData({ url, method, data, headers }),
    enabled: method === "GET",
    retry: 1,
    onSuccess: (data) => {
      console.log(data.data);
    },
  });

  const mutation = useMutation({
    mutationFn: (newData) => fetchData({ url, method, data: newData, headers }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const keyString = query.queryKey[0]?.toString();
          const match = keyString?.includes("/api/carts");
          return match;
        },
      });
    },
  });

  return { query, mutation };
};

export default useFetch;
