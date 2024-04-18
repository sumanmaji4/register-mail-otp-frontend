import { commonrequest } from './ApiCall'

export const registerFunction = async (data: object) => {
  // full user body
  return await commonrequest(
    'POST',
    `${import.meta.env.VITE_REACT_HOST_URL}/user/register`,
    data
  )
}

export const getOTP = async (data: object) => {
  // mail
  return await commonrequest(
    'POST',
    `${import.meta.env.VITE_REACT_HOST_URL}/user/sendotp`,
    data
  )
}

export const submitOTP = async (data: object) => {
  // mail, otp
  return await commonrequest(
    'POST',
    `${import.meta.env.VITE_REACT_HOST_URL}/user/verifyotp`,
    data
  )
}

export const userSignIn = async (data: object) => {
  // mail, password
  return await commonrequest(
    'POST',
    `${import.meta.env.VITE_REACT_HOST_URL}/user/signin`,
    data
  )
}
