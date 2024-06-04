import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Transformer } from "@/Types/Transormer";

export const transformerApi = createApi({
  reducerPath: "chatAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://transfomera.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("tokenT")
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTechnicianTransformers: builder.query<{ transformer: Transformer[] }, string>({
      query: (userId) => `api/transformers/${userId}`,
    }),

    registerTransformer : builder.mutation<void, {country:string, city:string, streetAddress:string, sensorId:string, serialNumber:number, location:string}>({
      query:(detail)=>({
        url:'api/transformers',
        method:"POST",
        body:detail
      })   
   })
  }),
});

export const { useGetTechnicianTransformersQuery, useRegisterTransformerMutation } = transformerApi;
