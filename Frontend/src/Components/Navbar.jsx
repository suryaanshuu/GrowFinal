import React from 'react'
import GrowLogo from '../../public/growLogoX.png'
import Invoice from './Invoice'
import MarketingBox from './MarketingBox'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between shadow-md items-center rounded-[15px]">

      <div className=''> {/*md:flex-wrap lg:flex-nowrap xl:justify-start*/}
        <img className='h-[100px] w-[100px] overflow-hidden' src={GrowLogo}></img>
      </div>

      <ul className='flex justify-between'>
        <a href='/MarketingBox'>< li className="mr-4 font-bold font-sans text-lg text-slate-500 text-balance antialiased hover:text-green-600">Home</li></a>
        <a href='/PlantList'><li className="mr-4 font-bold font-sans text-lg text-slate-500 text-balance antialiased hover:text-green-600">Products</li></a>
        {/* <a href='/Admin'><li className="mr-4 font-bold font-sans text-lg text-slate-500 text-balance antialiased hover:text-green-600">Admin Dashoard</li></a> */}
        <a href='/Invoice'><li className="mr-4 font-bold font-sans text-lg text-slate-500 text-balance antialiased hover:text-green-600">Invoice</li></a>
        <a href='/Login'><li className="mr-4 font-bold font-sans text-lg text-slate-500 text-balance antialiased hover:text-green-600">Login</li></a>

      </ul>

      </nav>
    </div>
  )
}

export default Navbar