import { FC, useState } from 'react'
import { getOTP } from '../services/Apis'
import { useNavigate } from 'react-router-dom'

interface SubmitEmailprops {}

type TcurrentUser = {
  email: string
  message: string
  userId: string
}

const SubmitEmail: FC<SubmitEmailprops> = ({}) => {
  let currentUser = localStorage.getItem('currentUser')
  let currentUserObj
  if (currentUser) currentUserObj = JSON.parse(currentUser) as TcurrentUser
  const tempMail = currentUserObj?.email || ''
  const [email, setEmail] = useState<string>(tempMail)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sendOtp = async (e: React.FormEvent<EventTarget>) => {
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
    const res = await getOTP({ email })
    //send OTP to mail id
    if (res.status === 201) {
      navigate('/submitotp')
    }
    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center h-lvh'>
      <div className='flex justify-center items-center '>
        <div className=' w-[500px] h-[500px]'>
          <img src='/SignUp.png' />
        </div>
        <form className=' flex flex-col  border-[1px] border-slate-200 rounded-2xl p-8 shadow gap-3 w-[400px]'>
          <h2 className=' font-extrabold text-3xl text-darkp mb-4'>
            Verify your <span className=' text-cred'>email</span>
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
          {error != '' && <p>{error}</p>}
          <button
            className='mt-4 w-full text-white bg-darkp p-4 rounded-2xl font-semibold'
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubmitEmail
