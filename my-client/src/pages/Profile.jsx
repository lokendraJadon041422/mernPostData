import React from 'react'
import { FormRow } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useDashboardContext } from './DashboardLayout'
import { Form, useNavigation } from 'react-router-dom'
import showToast  from '../utils/ShowToastContainer'
import createAxios from '../utils/createAxios'
import {Submit} from '../components';
// export const loader = async () => {
//   const { currentUser } = useDashboardContext()
//   return currentUser
// } 
export const action = async ({request}) => {
  const formData = await request.formData();

  const file = formData.get('avatar');
  if (file && file.size > 500000) {
    showToast('Image size too large','error');
    return null;
  }

  try {
    await createAxios.patch('/users/update-user', formData);
    showToast('Profile updated successfully','success');
  } catch (error) {
    showToast(error?.response?.data?.msg,'error');
  }
  return null;
  // try {
  //   const formData = await request.formData();
  //   const avatar = formData.get('avatar');
  //   if (avatar && avatar.size > 500000) {
  //     showToast('Image size too large','error');
  //     return null;
  //   }
  //   const data = Object.fromEntries(formData);
  // // console.log(data,formData)
  //   const response= await createAxios.patch('/users/update-user', data,{headers:{'Content-Type':'multipart/form-data'}});
  //   console.log(response)
  //   // showToast('success', 'User updated successfully');
  //   return null;
  // } catch (error) {
  //   console.log(error,'error')
  //   showToast(error?.response?.data?.message,'error');
  //   return null;
  // }
}


const Profile = () => {
  const { currentUser } = useDashboardContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow type='text' name='name' labelText='name' defaultValue={currentUser.name} />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            defaultValue={currentUser.lastName}
          />
          <FormRow type='email' name='email' labelText='email' defaultValue={currentUser.email} />
          <FormRow type='text' name='location' labelText='location' defaultValue={currentUser.location} />
          {/* <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button> */}
            <Submit classNameButton='btn btn-block form-btn '/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile