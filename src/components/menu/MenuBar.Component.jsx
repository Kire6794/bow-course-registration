import "./menu.style.css"
import Nav1Btn from "../buttons/Nav1Btn.Component"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button'


const MenuBar = (props)=>{

    const {userRole} = props    
    
    const [isDisabled, setDisabled] = useState(true)

    const enableBtn = ()=>{
        if(userRole === 'Admin') setDisabled(false)    
        else setDisabled(true)
    }

    useEffect(enableBtn, [userRole])


    return(
        <div className = "menu-bar">
            <Nav1Btn></Nav1Btn>
            <button class="btn btn-outline-primary"> {userRole} </button>
            {/*react-bootstrap Button Componet with the primary Style */}
            <Button variant="primary" type="button" disabled = {isDisabled}> {userRole} </Button>
        </div>
    )
}
export default MenuBar