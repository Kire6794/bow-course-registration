import { useState } from "react";


const UseShowHideProfileBar = (initialStateP = false) =>{
    const [isVisibleP,setIsVisibleP] = useState(initialStateP);
    const ShowHideProfileBar=()=>{
        setIsVisibleP(!isVisibleP);
    }
    return {isVisibleP,ShowHideProfileBar, setIsVisibleP};
}

export default UseShowHideProfileBar;


    