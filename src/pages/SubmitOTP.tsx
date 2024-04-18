import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitOTP } from '../services/Apis'

interface SubmitOTPprops {}

type TcurrentUser = {
  email: string
  message: string
  userId: string
}

const SubmitOTP: FC<SubmitOTPprops> = ({}) => {
  let currentUser = localStorage.getItem('currentUser')
  let currentUserObj
  if (currentUser) currentUserObj = JSON.parse(currentUser) as TcurrentUser
  const tempMail = currentUserObj?.email || ''
  const [otp, setOtp] = useState<string>(tempMail)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (tempMail == '') navigate('/')

  const submitMyOtp = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)

    const res = await submitOTP({ email: tempMail, otp })
    //send OTP to mail id
    // console.log(res)
    if (res.status === 201 || res.status === 200) {
      localStorage.setItem('tokendata', JSON.stringify(res.data))
      navigate('/dashboard')
    } else {
      console.log(res.response.data)
      setError('Someth!ng went wr0ng')
      if (res.response.data) setError(res.response.data.error)
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
            Enter <span className=' text-cred'>OTP</span>
          </h2>
          <input
            type='number'
            name='otp'
            value={otp}
            placeholder='Enter otp received on your mail'
            className=' border-b-[1px] border-slate-200 py-1 pl-3'
            onChange={(e) => {
              setOtp(e.target.value), setError('')
            }}
          />
          {error != '' && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{error}</p>
          )}
          <button
            className='mt-4 w-full text-white bg-darkp p-4 rounded-2xl font-semibold'
            onClick={submitMyOtp}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Submit OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubmitOTP
