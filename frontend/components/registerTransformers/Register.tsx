"use client"
import { useRegisterTransformerMutation } from "@/app/GlobalRedux/Features/transormers/transormersAPI"
import { useState } from "react"

const Register = () => {
    const [country, setCountry] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [streetAddress, setStreetAddress] = useState<string>("")
    const [serialNumber, setSerialNumber] = useState<number>(0)
    const [sensorId, setSensorId] = useState<string>('')
    const [ regiserTranfromer ] = useRegisterTransformerMutation()

    const registerTranformer = async ()=>{

        if (country && city && streetAddress){

            await regiserTranfromer({
                country,
                city,
                streetAddress,
                sensorId,
                serialNumber,
                location:''
            })
        }else{
            return <div>Please fill the required fields</div>
        }
    }

    const handleCountry = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCountry(e.target.value)
    }

    const handleCity = (e: React.ChangeEvent<HTMLInputElement>)=>(
        setCity(e.target.value)
    )

    const handleStreetAdddress = (e:React.ChangeEvent<HTMLInputElement>)=>(
        setStreetAddress(e.target.value)
    )

    const handleSerialNumber = (e:React.ChangeEvent<HTMLInputElement>)=>(
        setSerialNumber(Number(e.target.value))
    )

    const handleSensorId = (e:React.ChangeEvent<HTMLInputElement>)=>(
        setSensorId(e.target.value)
    )
  return (
    <div className="flex rounded-lg shadow-lg pl-2 pt-14 w-full">
        <div className="flex flex-col gap-4 w-full pt-6">
            <h1 className="font-bold text-2xl ">Register a Transformer</h1>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="country">Country*</label>
                <input id="country" placeholder="Select Your Optioning Country" className="w-full p-2 bg-gray-100 rounded-xl" onChange={(e)=>handleCountry(e)}/>
            </div>
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="city">City*</label>
                <input id="city" placeholder="Write the city where the transform locate" className="w-full p-4 bg-gray-100 rounded-xl " onChange={(e)=>handleCity(e)}/>
            </div>
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="street">City*</label>
                <input id="street" placeholder="Write the street address" className="w-full p-2 bg-gray-100 rounded-xl" onChange={(e)=>handleStreetAdddress(e)}/>
            </div>
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="serial">Serial Number</label>
                <input id="serial" placeholder="Write the serial number of the tranformer" className="w-full p-2 bg-gray-100 rounded-xl" onChange={(e)=>handleSerialNumber(e)}/>
            </div>
            <div className="w-full flex flex-col gap-4">
                <label htmlFor="sensor">Sensor ID</label>
                <input id="sensor" placeholder="write the sensor id of the transformer" className="w-full p-2 bg-gray-100 rounded-xl" onChange={(e)=>handleCity(e)}/>
            </div>
            <div>
                
                    {/* GoogleMaps */}
                
            </div>
            <button onClick={registerTranformer}>
                Submit
            </button>
        </div>
        <div className="bg-yellow-100 min-h-full w-96">

        </div>
    </div>
  )
}

export default Register