import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transformer } from "@/Types/Transormer";

const token = localStorage.getItem("tokenT");
export const transformerApi = createApi({
  reducerPath: "chatAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://transfomera.onrender.com/",
    headers: { Authorization: `Bearer ${token}` },
  }),
  endpoints: (builder) => ({
    getTechnicianTransformers: builder.query<{ transformer: Transformer[] }, string>({
      query: (userId) => `api/transformers/${userId}`,
    }),
  }),
});

export const { useGetTechnicianTransformersQuery } = transformerApi;
