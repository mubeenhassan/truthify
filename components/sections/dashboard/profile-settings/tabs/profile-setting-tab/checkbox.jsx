import React, { useState } from "react";

const Checkbox = ({ id, checked, onChange }) => {
  //   const [ischecked, setChecked] = useState(checked);

  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div onClick={handleToggle} className="relative w-10 h-5 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        readOnly
        className="hidden"
      />
      <label
        htmlFor="cbx-3"
        className={`relative block w-full h-full transition-all duration-200 ease-linear 
          ${checked ? "bg-[#016CCD]" : "bg-[#E5E5E5]"} rounded-full`}
      >
        {/* Slider Knob */}
        <span
          className={`absolute w-7 h-7  rounded-[8px] -top-1 left-0 shadow-[0_3px_8px_rgba(154,153,153,0.5)] 
            transform transition-transform duration-300 
            ${
              checked
                ? "translate-x-6 bg-[#016CCD] shadow-[0_3px_8px_rgba(79,46,220,0.2)]"
                : "-translate-x-3 bg-white"
            }`}
        >
          <span
            className={`bg-white rounded-[6px] -translate-x-1/2 -translate-y-1/2 transform w-6 h-6 absolute top-[14px] left-[14px]`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
