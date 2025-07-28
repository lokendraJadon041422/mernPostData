import React from 'react'
import { Form, Link, useNavigation } from 'react-router-dom'
import {Logo} from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage' 
import {FormRow} from '../components'
import createAxios from '../utils/createAxios'
import {redirect} from 'react-router-dom'
import showToast from '../utils/ShowToastContainer'
import {Submit} from '../components';

export const action = async({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await createAxios.post('/auth/register', data);
    // toast.success("User created successfully");
    showToast("User created successfully", "success");
    return redirect('/login');
  } catch (error) {
    showToast(error?.response?.data?.message, "error");
    // toast.error(response.data.message);
    return error
  }
}
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form' action={action}>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='name' isRequired={true} />
        <FormRow type='text' name='lastName' labelText='last name' isRequired={false} />
        <FormRow type='text' name='location' labelText='location' isRequired={true} />
        <FormRow type='email' name='email' labelText='email' isRequired={true} />
        <FormRow type='password' name='password' labelText='password' isRequired={true} />
        {/* <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button> */}
        <Submit classNameButton='btn btn-block'/>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register