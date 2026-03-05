import { useEffect, useState } from "react";

export function useFetch(url) {
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchProducts() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error("Something went wrong while fetching data");
          }
          const data = await res.json();
          setFetchedData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchProducts();

      return function () {
        controller.abort();
      };
    },
    [url],
  );

  return [fetchedData, isLoading, error];
}
