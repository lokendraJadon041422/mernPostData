import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants';
import { Form, useNavigation } from 'react-router-dom';
// import showToast from '../utils/ShowToastContainer';
// import createAxios from '../utils/createAxios';
import { useDashboardContext } from './DashboardLayout';
import {FormSelect} from '../components';
import showToast from '../utils/ShowToastContainer';
import createAxios from '../utils/createAxios';
import {Submit} from '../components';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await createAxios.post('/jobs', data);
    showToast('Job added successfully','success');
    return null;
  } catch (error) {
    showToast(error?.response?.data?.message,'error');
    return error;
  }
};
const AddJob = () => {
  const currentUser = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='title'labelText='Position' />
          <FormRow type='text' name='company' labelText='Company' />
          <FormRow
            type='text'
            labelText='Job Location'
            name='jobLocation'
            defaultValue={currentUser.location}
          />
          <FormSelect name='jobType' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)} labelText='Job Type' />

          <FormSelect name='jobStatus' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)} labelText='Job Status' />
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
  );
};
export default AddJob
