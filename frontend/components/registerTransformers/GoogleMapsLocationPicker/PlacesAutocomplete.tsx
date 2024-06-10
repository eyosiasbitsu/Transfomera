import usePlacesAutocomplete from "use-places-autocomplete";
import TextInputField from "../TextInputField";
import Image from "next/image";
import locationIcon from "@/public/images/LocationIcon.svg";
import { useEffect, useState } from "react";

const PlacesAutocomplete = ({
  onAddressSelect,
  clickedMapPlace,
}: {
  onAddressSelect: (address: string) => void;
  clickedMapPlace: string;
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'et' } }, 
    debounce: 300,
    cache: 86400,
  });

  useEffect(() => {

    setValue(clickedMapPlace);
    setShowSuggestions(false); // Hide suggestions after setting value
    
  }, [clickedMapPlace, setValue]);

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          className="p-4 hover:cursor-pointer hover:bg-slate-50 flex gap-4 items-center"
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect(description);
          }}
        >
          <Image
            src={locationIcon}
            height={0}
            width={0}
            className="w-3 h-auto"
            alt="Location Icon"
          />
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  const handleInputChange = (enteredKeyword: string) => {
    setValue(enteredKeyword);
    setShowSuggestions(true);
  }
  return (
    <div>
      <TextInputField
        value={value}
        inputTitle="Location"
        placeHolder="Search your business location"
        setValue={handleInputChange}
        disabled={!ready}
        required={true}
      />

      {(status === "OK" && showSuggestions)  && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
