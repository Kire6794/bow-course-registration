import React from 'react'

const Selector = ({Category,Items, SetSelectorValue, SelectedValue})=>{


    return(
        <div className="mb-3">
        <label htmlFor="program-select" className="form-label">Select a {Category}:</label>
        <select
          id="program-select"
          className="form-select"
          value={SelectedValue}
          onChange={(e) => SetSelectorValue(e.target.value)}
        >
          <option value="">--Select a Program--</option>

          {Items.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
          
        </select>
      </div>
    )
}

export default Selector