import axios from 'axios'

export const commonrequest = async (
  method: 'POST' | 'GET',
  url: string,
  body: object,
  header?: string
) => {
  let config = {
    method,
    url,
    header: header ? header : { 'Content-Type': 'application/json' },
    data: body,
  }

  return axios(config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}
