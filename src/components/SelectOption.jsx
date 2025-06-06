import { useState } from "react";
import { X } from "lucide-react";

export default function DropdownMenus() {
  const options = ["Towing", "Flat tyre", "fuel delivery", "jump start", "Mechanical Repair"];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelection = (event) => {
    const value = event.target.value;
    if (value && !selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter(option => option !== optionToRemove));
  };

  return (
    <div className="w-full  p-4  shadow rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Service Offered</h2>
      
      {/* Selected Options */}
      <div className="flex flex-wrap gap-2 ">
        {selectedOptions.map((option) => (
          <div key={option} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
            {option}
            <button onClick={() => removeOption(option)} className="ml-2 text-gray-600 hover:text-gray-800">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {/* First Dropdown */}
      <select 
        onChange={handleSelection} 
        className="w-full p-2 border rounded-md max-w-md">
        <option value="" disabled selected>Select services</option>
        {options.map((option) => (
          !selectedOptions.includes(option) && (
            <option key={option} value={option}>{option}</option>
          )
        ))}
      </select>
    </div>
  );
}
