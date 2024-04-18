import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface DashboardProps {}

interface Ttokendata {
  email: string
  token: string
  verified: boolean
}

const Dashboard: FC<DashboardProps> = ({}) => {
  const navigate = useNavigate()
  let tokendata = localStorage.getItem('tokendata')

  useEffect(() => {
    if (!tokendata) {
      navigate('/')
      return
    }
    let tokendataObj: Ttokendata = JSON.parse(tokendata)
    if (!tokendataObj.email || !tokendataObj.token) {
      navigate('/')
    }
    setEmail(tokendataObj.email)
    setVerified(tokendataObj.verified)
  }, [tokendata])

  const [email, setEmail] = useState('')
  const [verified, setVerified] = useState(false)

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className=' text-2xl'>
        <p>
          Hi <span className='font-bold text-blue-900'>{email}</span>, this is
          your dashboard
        </p>
        {!verified && (
          <p>
            Your email id is not verified, to verify your email{' '}
            <Link to='/submitmail'>
              <span className=' underline font-bold text-blue-700'>
                click here
              </span>
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
