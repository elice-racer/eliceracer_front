import { useEffect, useState } from "react";
import { instance as axiosInstance } from "../services/instance";

interface FetchDataProps {
  url: string;
  method: "get" | "post" | "patch" | "put" | "delete";
  data: {} | undefined;
  params: {} | undefined;
}
const useAxios = () => {
  let response = null;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const fetchData = async ({ url, method, data = {}, params = {} }: FetchDataProps) => {
    setLoading(true);

    controller.abort();
    controller = new AbortController();
    try {
      response = await axiosInstance({
        url: url,
        method: method,
        data: data,
        params,
        signal: controller.signal,
      });
      return response;
    } catch (e: any) {
      //   if (axiosInstance.isCancel(e)) {
      //     console.error("Request cancelled", e.message);
      //   } else {
      //     setError(e.response ? e.response.data : e.message);
      //   }
      setError(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};
export default useAxios;
