import React from 'react'
import { FormRow, FormSelect, Submit } from './index';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from '../utils/constants';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form,useSubmit } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import SubmitBtn from './Submit';
export const loader = () => {
    return null;
}
const SearchContainer = () => {
    const Submit = useSubmit()
    const debounce = (fn)=>{
      let timeout;
      return(e)=>{
        const data = e.currentTarget.form
          clearTimeout(timeout);
          timeout = setTimeout(()=>{
            fn(data)
          },500);
      }
     }
    
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}
          <FormRow type='search' labelText='search' name='title' defaultValue='a' onChange={debounce((form)=>Submit(form))}/>
          <FormSelect
            labelText='job status'
            name='status'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue='all'
            onChange={(e)=>Submit(e.currentTarget.form)}
          />
          <FormSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue='all'
              onChange={(e)=>Submit(e.currentTarget.form)}
          />
          <FormSelect
            name='sort'
            defaultValue='newest'
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e)=>Submit(e.currentTarget.form)}
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          {/* <SubmitBtn classNameButton='btn form-btn' />  */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
