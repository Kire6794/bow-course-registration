import React, {useState, useEffect} from 'react'
import MessageContent from './MessageContent.Component'

const FormItem = ({Key, Form, onDelete})=>{

    const [isVisible, setIsVisible] = useState(false)
    const [dropBtnText, setDropBtnText] = useState("Open")

    const toogleMessage = ()=>{
        setIsVisible(!isVisible)
        console.log(Form)
    }
    const OpenMsg = ()=>{
        switch(dropBtnText){
            case "Close":
                setDropBtnText("Open")
                break
            case "Open":
                setDropBtnText("Close")
                break

        }
    }

 

    return(
        <>
        <li class="list-group-item d-flex justify-content-start align-items-start">
            <div class="ms-0 me-auto">
            <div class="fw-bold">{Form.about}</div>
                <p className='d-flex justify-content-start m-0'>From: {Form.name}</p>
                <p className='m-0'>On: {Form.date}</p>
            </div>
                <span 
                    class={dropBtnText==="Open"?"badge text-bg-success rounded-pill mt-3" : "badge text-bg-danger rounded-pill mt-3"}
                    style={{ cursor: 'pointer' }}
                    onClick = {()=>{
                        toogleMessage()
                        OpenMsg()
                    }}
                    value={dropBtnText}>
                        {dropBtnText}
                </span>
                <span
                    class="badge text-bg-danger rounded-pill mt-3 ms-1"
                    style={{ cursor: 'pointer' }}
                    onClick = {onDelete}
             
                >
                    Delete
                </span>
          
        </li>
        {isVisible && <MessageContent Message = {Form.message}></MessageContent>}
        </>


    )
}
export default FormItem