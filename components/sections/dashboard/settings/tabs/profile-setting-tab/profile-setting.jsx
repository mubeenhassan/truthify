import Image from "next/image";
import Checkbox from "./checkbox";
import { useState } from "react";

function ProfileSetting() {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const handleToggle = (key, value) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="w-full md:px-8 max-w-[520px]">
      <div className="flex flex-col gap-2">
        {/* first div */}
        <div className="flex justify-center items-center gap-2 mr-auto md:mr-0 md:-ml-16">
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400 flex justify-center items-center mr-4">
            <Image
              src="/icons/profileIcon.svg"
              alt="profile icon"
              priority
              width={40}
              height={40}
              className="w-[70px] h-[70px]"
            />
          </div>
          <button className="text-[14px] text-[#1A1A1A] p-[6px] px-3 cursor-pointer rounded-sm border transition-all duration-200 hover:border-gray-500  border-white ">
            Update
          </button>
          <button className="text-[14px] text-[#1A1A1A] p-[6px] px-3 cursor-pointer rounded-sm border transition-all duration-200 hover:border-gray-500  border-white flex justify-center items-center gap-1">
            <Image
              src="/icons/removeIcon.svg"
              alt=""
              priority
              width={20}
              height={20}
              className="w-[16px] h-[16px]"
            />{" "}
            Remove
          </button>
        </div>
        {/* inputs */}
        <div className="w-full flex flex-col justify-end gap-6 my-5">
          <div className="flex justify-end items-center gap-4 w-full">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Name
            </span>
            <input
              type="text"
              placeholder="Peter Griffin"
              className="text-[16px] text-[#4B4B4B] outline-none border border-[#DDE5EF] rounded-sm px-3 p-2 w-full  max-w-[330px]"
            />
          </div>
          <div className="flex justify-end items-center gap-4 w-full">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Username
            </span>
            <input
              type="text"
              placeholder="Peterdactyl2015"
              className="text-[16px] text-[#4B4B4B] outline-none border border-[#DDE5EF] rounded-sm px-3 p-2 w-full  max-w-[330px]"
            />
          </div>
          <div className="flex justify-end items-center gap-4 w-full">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Email
            </span>
            <input
              type="email"
              placeholder="petergriffin215@gmail.com"
              className="text-[16px] text-[#4B4B4B] outline-none border border-[#DDE5EF] rounded-sm px-3 p-2 w-full  max-w-[330px]"
            />
          </div>
          <div className="flex  justify-end items-center -mt-4">
            <span className="text-[#016CCD] text-[12px] md:text-[15px] inline">
              {" "}
              Email not verified.{" "}
            </span>
            <a
              href=""
              className="text-[#016CCD] text-[12px] md:text-[15px] inline underline "
            >
              {" "}
              Verify now
            </a>
          </div>
        </div>
        {/*checkbox parent div */}
        <div className="flex justify-center items-start flex-col gap-8">
          <div className="flex items-center gap-3 lg:ml-8">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Current Plan
            </span>
            <div className="flex justify-end items-center ">
              <span className="text-[#016CCD] text-[12px] md:text-[15px] inline">
                {" "}
                Background Integrity Check{" "}
              </span>
              <a
                href=""
                className="text-[#016CCD] text-[12px] md:text-[15px] inline underline "
              >
                {" "}
                Upgrade Plan{" "}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-8 ">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Microsoft Connect
            </span>
            <Checkbox
              id="checkbox1"
              checked={checkboxes.checkbox1}
              onChange={(value) => handleToggle("checkbox1", value)}
            />
          </div>
          <div className="flex items-center gap-8 md:ml-2">
            <span className="text-[14px] font-semibold text-[#4B4B4B]">
              Google+ Connect
            </span>
            <Checkbox
              id="checkbox2"
              checked={checkboxes.checkbox2}
              onChange={(value) => handleToggle("checkbox2", value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 gap-4  -ml-5 ">
          <span className="text-[#AFAFAF] text-[13px] font-semibold cursor-pointer -ml-18">
            Logout
          </span>
          <span className="cursor-pointer text-[#FF4B4B] text-[13px] font-semibold">
            Delete my account
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
