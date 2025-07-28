import React from 'react'
// import { useParams } from 'react-router-dom'
// import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import { FormRowSelect } from '../components';
// import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import { Form, useLoaderData, useNavigation,useNavigate, redirect } from 'react-router-dom';
import createAxios from '../utils/createAxios';
import { FormRow,FormSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import  showToast  from '../utils/ShowToastContainer';
import {Submit} from '../components';
export const loader = async ({params}) => {
    const {id} = params;
    try{
      const {data:{job}} = await createAxios.get(`/jobs/${id}`);
      return job;
    }catch(error){
      console.log(error);
      return error;
    }
}
export const action = async ({request, params}) => {
    // const {id} = params;
    const {id} = params;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try{
      const {data:{job}} = await createAxios.patch(`/jobs/${id}`,data);
      showToast('Job updated successfully','success');
      return redirect('/dashboard/all-jobs');
    }catch(error){
      console.log(error);
      showToast(error?.response?.data?.message,'error');
      return error;
    }
}
const EditJob = () => {
    const job = useLoaderData();
    const isSubmitting = useNavigation().state === 'submitting';
    const navigate = useNavigate();
    // console.log(job);
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='title' labelText='Position' defaultValue={job.title} />
          <FormRow type='text' name='company' labelText='Company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />

          <FormSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          {/* <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button> */}
          <Submit classNameButton='btn btn-block form-btn '/> 
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob