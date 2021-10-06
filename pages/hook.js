import { useState,useRef } from "react";

const useHook = (handleClick, handleFormClick) =>{
    const [isActive, setActive] = useState(false);
     handleClick = () =>{
        setActive(!isActive);

        console.log(isActive);
      }
      const [hiddenClass, setActiveClass] = useState(false);
      handleFormClick = (e) =>{
         setActiveClass(!hiddenClass);
        console.log("Form Handled");
        e.preventDefault();
      }
return {handleClick, isActive, setActive, handleFormClick,hiddenClass, setActiveClass }
}
export default useHook;