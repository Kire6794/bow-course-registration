import React, {useState,useEffect} from 'react'
import FormItem from "./FormItem.Component"

const Forms = (props)=>{
    const [forms, setForms] = useState(props.Forms)
    const deleteForm = (index) => {
        const updatedForms = forms.filter((_, i) => i !== index); // Create a new array without the deleted form
        setForms(updatedForms); // Update the state
    };


    return(
        <>
        <ol className="list-group list-group-numbered m-3"> 
            <h3>Forms:</h3>
            {forms.map((form, index)=>{return (
                <FormItem Key={index} Form ={form} onDelete={()=>{deleteForm(index)}}></FormItem>
            )})}
        </ol>
        </>
    )
}
export default Forms