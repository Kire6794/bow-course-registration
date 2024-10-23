import React, {useState, useEffect} from 'react'



const MessageContent = ({Message})=>{

    return(
                <div className="mb-0">                 
                    <textarea
                    name="message"
                    className="form-control"
                    rows="3"
                    value={Message}
                    readOnly
                    />
                </div>
    )

}

export default MessageContent