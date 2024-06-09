import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SensorData, Transformer } from "@/Types/Transormer";

export const transformerApi = createApi({
  reducerPath: "transformerAPI",
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

    getAllTransformers: builder.query<Transformer[], void>({
      query: () => `api/transformers`,
    }),

    getTransformer: builder.query<{transformer: Transformer}, string>({
      query: (transformerId) => `api/transformers/${transformerId}`,
    }),

    getSensorData: builder.query<SensorData[], string>({
      query: (transformerId) => `api/sensor/${transformerId}`,
    }),

    registerTransformer : builder.mutation<void, {country:string, city:string, streetAddress:string, sensorId:string, serialNumber:number, location:string, latitude: number, longitude: number}>({
      query:(detail)=>({
        url:'api/transformers',
        method:"POST",
        body:detail
      })   
   })
  }),
});

export const { useGetTechnicianTransformersQuery, useRegisterTransformerMutation, useGetAllTransformersQuery, useGetTransformerQuery, useGetSensorDataQuery } = transformerApi;
