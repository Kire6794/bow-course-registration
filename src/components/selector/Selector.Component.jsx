import React from 'react'

const Selector = ({Category})=>{

    const [selectedItem, setSelectedItem] = useState(''); // Para manejar el programa seleccionado

    return(
        <div className="mb-3">
            <label htmlFor="program-select" className="form-label">Select a {Category}:</label>
            <select
            
            className="form-select"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            >
            <option value="">--Select a Program--</option>
            {programNames.map((program, index) => (
                <option key={index} value={program}>{program}</option>
            ))}
            </select>
        </div>
    )
}

export default Selector