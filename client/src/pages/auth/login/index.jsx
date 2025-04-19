import { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Cookies from 'js-cookie'

import { useAuth } from '../../../context/orderWebpage';
import axios from '../../../axiosInstance';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error,setError] = useState('') 
  const {loginUser} = useAuth()

  const Navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      localStorage.getItem('role') === 'ADMIN' ? Navigate('/admin') : Navigate('/user');
    }
  }, []);

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    const actualRole = role === 'admin' ? "ADMIN": "USER"
    const data = {
      email,
      password,
      role : actualRole
    }
     try{
        const response = await axios.post('/auth/login',data)
        if(response.status === 200){
            loginUser(response.data.token)
            localStorage.getItem('role') === 'ADMIN' ? Navigate('/admin') : Navigate('/user');
        }
     }
     catch(err){
      setEmail('')
      setPassword('')
      setRole('user')
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message)
      }
      else{
        setError('Something went wrong')
      }
     }
  }

  return (
    <div className="h-screen p-3 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg')" }}>
      
      <div className='w-md  bg-white/30 backdrop-blur-lg p-8 rounded-lg border border-white/30'>
      <h1 className='text-4xl'>Login Here</h1>
     


      <form className='flex flex-col gap-4 mt-6' onSubmit={OnSubmitHandler}>
        {/* Radio buttons for user selection */}
        <p>You’re logging as a <strong>{role === 'admin' ? 'Admin' : 'User'}</strong></p>
        <div className='flex gap-4'>
        <div className='flex items-center gap-2'>
            <input
              id='user'
              type='radio'
              className='cursor-pointer'
              name='role'
              value='user'
              checked={role === 'user'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor='user'>User</label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              id='admin'
              type='radio'
              name='role'
               className='cursor-pointer'
              value='admin'
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor='admin'>Admin</label>
          </div>
         
        </div>

        {/* Input fields */}
       
        <label className='text-lg' htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          className='border-b-4 mt-0 p-2 rounded-md outline-0'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className='text-lg' htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          className='border-b-4 mt-0 p-2 rounded-md outline-0'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit' className='mt-5 bg-[#a2cf4f] text-white p-2 rounded-md cursor-pointer'>
          Login
        </button>
      </form>
      {error.length > 0 && <p className='text-lg pt-2 text-center text-[#ff4545]'>* {error}</p>}
      <p className='text-lg text-center mt-2'>Not registered? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
