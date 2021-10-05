import { useState,useRef } from "react";

const useHook = (handleClick) =>{
    const [isActive, setActive] = useState("hidden");
     handleClick = () =>{
        setActive(!isActive);
        console.log('Button Clickd');
      }
return {handleClick, isActive, setActive}
}
export default useHook;