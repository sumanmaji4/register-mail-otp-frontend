import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSignIn } from '../services/Apis'

interface SigninProps {}

const SignIn: FC<SigninProps> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogIn = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)
    if (email.trim().length == 0) {
      setError('email cant be empty')
      return
    }
    if (!email.includes('@')) {
      setError('enter a valid email address')
      return
    }
    if (password.trim().length === 0) {
      setError('enter a valid password')
      return
    }

    const res = await userSignIn({ email, password })
    // console.log(res)
    if (res.status === 201 || res.status === 200) {
      localStorage.setItem('tokendata', JSON.stringify(res.data))
      navigate('/dashboard')
    } else {
      setError('Someth!ng went wr0ng')
    }
    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center h-lvh'>
      <div className='flex justify-center items-center '>
        <div className=' w-[500px] h-[500px]'>
          <img src='/SignIn.png' />
        </div>
        <form className=' flex flex-col  border-[1px] border-slate-200 rounded-2xl p-8 shadow gap-3 w-[400px]'>
          <h2 className=' font-extrabold text-3xl text-darkp mb-4'>
            Fill what we know <span className=' text-cred'>!</span>
          </h2>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            className=' border-b-[1px] border-slate-200 py-1 pl-3'
            onChange={(e) => {
              setEmail(e.target.value), setError('')
            }}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            className=' border-b-[1px] border-slate-200 py-1 pl-3'
            onChange={(e) => {
              setPassword(e.target.value), setError('')
            }}
          />
          {error != '' && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{error}</p>
          )}
          <button
            className='mt-4 w-full text-white bg-darkp p-4 rounded-2xl font-semibold'
            onClick={handleLogIn}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Sign In'}
          </button>
          <Link
            to='/signup'
            className=' w-full border-darkp border-2 p-4 rounded-2xl font-semibold text-darkp text-center'
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignIn
