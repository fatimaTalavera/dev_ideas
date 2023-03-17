import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['userToken']);

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true, credentials: 'include' })
      .then(res => {
        console.log(res)
        setCookie('user', res.data.user)
        navigate('/ideas');
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='col-12 col-md-6 mt-2'>
      <div className='col-12 col-md-9 mx-auto card bg-white border-4 border-dark text-dark px-5 py-5'>
        <h1 className='text-center'>Login</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="" className='form-label mt-3'>Email:</label>
          <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="" className='form-label mt-3'> Password</label>
          <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
          <div className='text-end'>
            <button className='btn btn-primary mt-3'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login