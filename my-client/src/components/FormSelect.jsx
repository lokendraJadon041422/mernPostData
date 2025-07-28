import React from 'react'

const FormSelect = ({ name, list, defaultValue,labelText,onChange }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText}
            </label>
            <select
                name={name}
                id={name}
                className='form-select'
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {list.map((itemValue) => {
                    return (
                        <option key={itemValue} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default FormSelect
