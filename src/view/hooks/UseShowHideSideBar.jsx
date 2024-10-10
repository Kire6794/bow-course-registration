import { useState } from "react";

//Personilized function with the initial state false as default in case that no value is passed to the function by default is false.
const UseShowHideSideBar = (initialState = false) =>{
    //initial value of isVisibe=false.
    const [isVisible,setIsVisible] = useState(initialState);
    //with this function I´m changing the value of isVisible
    const ShowHideSideBar=()=>{
        setIsVisible(!isVisible);
    }
    //the hook returns an object with two properties. (I´m using this in the app.js)
    return {isVisible,ShowHideSideBar, setIsVisible};
}

export default UseShowHideSideBar;


    