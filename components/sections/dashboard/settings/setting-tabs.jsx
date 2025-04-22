'use client'
import { useEffect, useRef, useState } from "react";

const settingTabs=[
    {id:'profile',title:'Profile'},
    {id:'privacy&security',title:'Privacy & Security'},
    {id:'payment',title:'Payment'},
    {id:'content preference',title:'Content Preference'},
    {id:'api',title:'API'},
]
function 
SettingTabs({activeTab ,setActiveTab}) {

    const [underlineStyles, setUnderlineStyles] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);
    const tabContainerRef = useRef(null);


    useEffect(() => {
        const activeTabIndex = settingTabs.findIndex((tab) => tab.id === activeTab);
        if (activeTabIndex !== -1 && tabRefs.current[activeTabIndex]) {
          const activeTabElement = tabRefs.current[activeTabIndex];
          const containerOffset = tabContainerRef.current.offsetLeft;

          setUnderlineStyles({
            left:activeTabElement.offsetLeft - containerOffset,
            width: activeTabElement.offsetWidth,
          });
        }
      }, [activeTab, settingTabs]);
  return (
    <div className="w-full my-4 pt-3">
      <ul ref={tabContainerRef} className="flex justify-start gap-4 md:justify-between items-center lg:gap-2 max-w-[600px]">
        {
            settingTabs.map((tab,i)=>{
                return(
                    <span
                    ref={(el) => (tabRefs.current[i] = el)}

                    key={i} className={`text-[10px] md:text-[14px] lg:text-[16px] transition-all duration-200  cursor-pointer ${activeTab==tab.id ?'text-[#016CCD]':'text-[#545455]'}`}
                    onClick={()=>{
                        setActiveTab(tab.id)
                    }}
                    >{tab.title}</span>
                )
            })
        }
      </ul>
      <div className="w-full relative bg-gray-100 mt-2 rounded-xl h-[2px] overflow-hidden">
        <div
        style={{
            left: `${underlineStyles.left}px`,
            width: `${underlineStyles.width}px`,
          }}
        className="absolute top-0   bg-[#016CCD] rounded-xl h-[2px] transition-all duration-300"></div>
      </div>
    </div>
  )
}

export default SettingTabs
