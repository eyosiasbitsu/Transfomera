"use client";
import { useRegisterTransformerMutation } from "@/app/GlobalRedux/Features/transormers/transormersAPI";
import { useState } from "react";
import Button from "../UI/Button";
import LocationPicker from "./GoogleMapsLocationPicker/LocationPicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ChatBot from "../Technician/Home/ChatBot";

const Register = () => {
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<number>(0);
  const [sensorId, setSensorId] = useState<string>("");
  const [latitude, setLatitude] = useState(9.030087499999999);
  const [longitude, setLongitude] = useState(38.7628819);

  const [regiserTranfromer, { isLoading }] = useRegisterTransformerMutation();
  const router = useRouter();

  const registerTranformer = async () => {
    if (city && streetAddress) {
      try {
        const res = await regiserTranfromer({
          city,
          streetAddress,
          sensorId,
          serialNumber,
          location: "",
          latitude,
          longitude,
        });
        toast.success("Transormer registered successfully.");
        router.push("/home");
      } catch (error) {
        toast.error("Error registering transformer!");
      }
    } else {
      return <div>Please fill the required fields</div>;
    }
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);

  const handleStreetAdddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStreetAddress(e.target.value);

  const handleSerialNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSerialNumber(Number(e.target.value));

  const handleSensorId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSensorId(e.target.value);
  return (
    <div className="flex gap-4 rounded-lg shadow-lg pl-8 pt-14 w-full">
      <div className="flex flex-col gap-4 w-full pt-6">
        <h1 className="font-bold text-2xl ">Register a Transformer</h1>
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="city">City*</label>
          <input
            id="city"
            placeholder="Write the city where the transform locate"
            className="mt-2 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            onChange={(e) => handleCity(e)}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="street">Street Address*</label>
          <input
            id="street"
            placeholder="Write the street address"
            className="mt-2 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            onChange={(e) => handleStreetAdddress(e)}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="serial">Serial Number</label>
          <input
            id="serial"
            placeholder="Write the serial number of the tranformer"
            className="mt-2 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            onChange={(e) => handleSerialNumber(e)}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="sensor">Sensor ID</label>
          <input
            id="sensor"
            placeholder="write the sensor id of the transformer"
            className="mt-2 bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            onChange={(e) => handleSensorId(e)}
          />
        </div>
        <div>
          {/* GoogleMaps */}
          <LocationPicker
            lat={latitude}
            lng={longitude}
            setLat={setLatitude}
            setLng={setLongitude}
          />
        </div>

        <Button
          message1="Register"
          message2="Registering..."
          onClick={registerTranformer}
          isLoading={isLoading}
        />
      </div>
      <div className="w-[30%] bg-[#F6F2DD] flex flex-col items-center gap-4 pb-20">
        <ChatBot />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
