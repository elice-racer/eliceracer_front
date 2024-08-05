import { useState } from "react";

const useAxios = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (callApi: any) => {
    setLoading(true);

    try {
      const res = await callApi();
      return res;
    } catch (e: any) {
      setError(e.response ? e.response.data : e.message);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, fetchData };
};

export default useAxios;

// const useAxios= () => {
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   let controller = new AbortController();

//   useEffect(() => {
//     return () => controller?.abort();
//   }, []);

//   const fetchData = async (url: string, method: AxiosMethod, data?: any, params?: any) => {
//     setLoading(true);

//     controller.abort();
//     controller = new AbortController();
//     try {
//       switch (method) {
//         case "get":
//           return await axiosInstance.get(url);
//         case "post":
//           return await axiosInstance.post(url, data);
//         case "patch":
//           return await axiosInstance.patch(url, data);
//         case "delete":
//           return await axiosInstance.delete(url, data);
//       }
//     } catch (e: any) {
//       setError(e.response ? e.response.data : e.message);
//     } finally {
//       setLoading(false);
//     }

//     try {
//       const response = await axiosInstance({
//         url: url,
//         method: method,
//         data: data,
//         params,
//         signal: controller.signal,
//       });

//       return response;
//     } catch (e: any) {
//     } finally {
//     }
//   };

//   return { error, loading, fetchData };
// };

// const MyCoponent = () => {
//   const { fetchData, loading, error } = useAxios();
//   const [data, setData] = useState<any>();

//   const fetchUserPage = async () => {
//     const res = await fetchData("getUser", "get", {}, {});
//     setData(res);
//   };

//   useEffect(() => {
//     fetchUserPage();
//   }, []);
//   return <div>유저정보</div>;
// };
