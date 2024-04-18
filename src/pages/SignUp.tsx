import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BsEyeSlash } from 'react-icons/bs'
import { BsEye } from 'react-icons/bs'
import { registerFunction } from '../services/Apis'

interface SignUpProps {}

const signUpSchema = z
  .object({
    firstname: z.string().trim().min(1, 'First name is required'),
    lastname: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().email(),
    contact: z.string().trim(),
    password: z
      .string()
      .trim()
      .min(5, 'Password must be at least 5 characters'),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type TSignUpSchema = z.infer<typeof signUpSchema>

const SignUp: FC<SignUpProps> = ({}) => {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const navigate = useNavigate()

  const onSubmit = async (data: TSignUpSchema) => {
    // TODO: submit to server
    // ...
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    // console.log(data)
    const response = await registerFunction(data)
    // console.log(response)
    if (response.status === 201) {
      reset()
      // console.log(response)
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      navigate('/submitmail')
    } else {
      setError(response.error)
    }
  }

  return (
    <div className='flex justify-center items-center h-lvh'>
      <div className='flex justify-center items-center '>
        <div className=' w-[500px] h-[500px]'>
          <img src='/SignUp.png' />
        </div>
        <form
          onChange={() => setError('')}
          onSubmit={handleSubmit(onSubmit)}
          className=' flex flex-col  border-[1px] border-slate-200 rounded-2xl p-8 shadow gap-3 w-[400px]'
        >
          <section className='flex justify-between items-center'>
            <h2 className=' font-extrabold text-3xl text-darkp mb-4'>
              Let us know <span className=' text-cred'>!</span>
            </h2>
            <Link to='/' className='text-darkp font-bold underline'>
              Sign <span className='text-cred'>In</span>
            </Link>
          </section>
          <input
            {...register('firstname')}
            type='text'
            name='firstname'
            placeholder='First Name'
            className=' border-b-[1px] border-slate-200 py-1 pl-2'
          />
          {errors.firstname && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.firstname.message}`}</p>
          )}
          <input
            {...register('lastname')}
            type='text'
            name='lastname'
            placeholder='Last Name'
            className=' border-b-[1px] border-slate-200 py-1 pl-2'
          />
          {errors.lastname && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.lastname.message}`}</p>
          )}
          <div className='flex items-center justify-between relative'>
            <input
              {...register('password')}
              type={showPass ? 'text' : 'password'}
              name='password'
              placeholder='Set Password'
              className=' border-b-[1px] border-slate-200 py-1 pl-2 pr-6 w-full'
            />
            <div
              className='absolute right-0 cursor-pointer'
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <BsEyeSlash /> : <BsEye />}
            </div>
          </div>
          {errors.password && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.password.message}`}</p>
          )}
          <div className='flex items-center justify-between relative'>
            <input
              {...register('confirmPassword')}
              type={showConfirmPass ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Retype Password'
              className=' border-b-[1px] border-slate-200 py-1 pl-2 pr-6 w-full'
            />
            <div
              className='absolute right-0 cursor-pointer'
              onClick={() => setShowConfirmPass((prev) => !prev)}
            >
              {showConfirmPass ? <BsEyeSlash /> : <BsEye />}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.confirmPassword.message}`}</p>
          )}
          <input
            {...register('contact')}
            type='contact'
            name='contact'
            placeholder='Contact Mode'
            className=' border-b-[1px] border-slate-200 py-1 pl-2'
          />
          {errors.contact && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.contact.message}`}</p>
          )}
          <input
            {...register('email')}
            type='email'
            name='email'
            placeholder='Enter Email'
            className=' border-b-[1px] border-slate-200 py-1 pl-2'
          />
          {errors.email && (
            <p className='text-red-500 text-xs -mt-2 py-2'>{`${errors.email.message}`}</p>
          )}
          {error && <p className='text-red-500 text-xs -mt-2 py-2'>{error}</p>}
          <button
            disabled={isSubmitting}
            className='mt-4 w-full text-white bg-darkp p-4 rounded-2xl font-semibold '
          >
            Sing Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
