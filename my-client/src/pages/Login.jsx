import React from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import {Logo} from '../components'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {FormRow} from '../components'
import createAxios from '../utils/createAxios'
import {redirect} from 'react-router-dom'
import showToast from '../utils/ShowToastContainer'
import {Submit} from '../components';
export const action = async({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await createAxios.post('/auth/login', data);
        showToast("User logged in successfully", "success");
        return redirect('/dashboard');
    } catch (error) {
       showToast(error?.response?.data?.message, "error");
        return error;
    }
}

const Login = () => {
    const navigate = useNavigate();
    const loginDemoUser = async () => {
        const data = {
            email: 'test@test.com',
            password: 'secret123',
        };
        try {
            await createAxios.post('/auth/login', data);
            showToast('take a test drive','success');
            navigate('/dashboard');
        } catch (error) {
            showToast(error?.response?.data?.msg,'error');
        }
    };
  return (  
    <Wrapper>
    <Form method='post' className='form' action={action}>
      <Logo />
      <h4>Login</h4>
      <FormRow type='email' name='email' labelText='email' isRequired={true} />
      <FormRow type='password' name='password' labelText='password' isRequired={true} />
      {/* <button type='submit' className='btn btn-block' disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'submit'}
      </button> */}
      <Submit classNameButton='btn btn-block'/>
      <button type='button' className='btn btn-block' onClick={loginDemoUser}>
        explore the app
      </button>
      <p>
        Not a member yet?
        <Link to='/register' className='member-btn'>
          Register
        </Link>
      </p>
    </Form>
  </Wrapper>
  )
}

export default Login