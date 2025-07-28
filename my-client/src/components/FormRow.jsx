import React from 'react'

const FormRow = ({type, name, labelText,isRequired,defaultValue='',onChange }) => {
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
      {labelText}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      className='form-input'
      required={isRequired}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  </div>
  )
}

export default FormRow
