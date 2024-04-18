import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}) => {
  return (
    <>
      <div className='w-full h-[99vh]'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
