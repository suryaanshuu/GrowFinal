import React from 'react'
import whiteLogo from '../../public/growLogoWhite.png'

const Footer = () => {
  return (
      <div>
        <footer className='bg-gray-900 antialiased font-medium mt-4 flex justify-between'>
        <div className='mt-9'>
          <img src={whiteLogo} className='h-[200px] w-[200px] overflow-hidden'></img><br></br>
          <div className='ml-9 text-white mb-4'>
            copyright © 2024 Grow.<br></br>
            All right reserved.
          </div>
        </div>

        <div className='pt-10'>
          <h3 className='text-white'>Sitemap</h3><br></br>

          <ul className='text-gray'>
            <li className='text-gray-1000 hover:text-green-600'>
              <a href='#'>About Us</a>
            </li>

            <li className='text-gray-1000 hover:text-green-600'>
              <a href='#'>Contact Us</a>
            </li>

            <li className='text-gray-1000 hover:text-green-600'>
              <a href='#'>Terms & Conditions</a>
            </li>
          </ul>
        </div>
        
        <div className='pt-10'>
          <h3 className='text-white'>Informative</h3><br></br>
          <ul>
            <li className='text-gray-1000 hover:text-green-600'>
              <a href='#'>FAQ</a>
            </li>

            <li className='text-gray-1000 hover:text-green-600'>
              <a href='#'>Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className='mr-9 pt-10'>
          <h3 className='text-white'>Subscribe</h3> <br></br>
          <div className='mr-9 relative'>
            <input className='outline-none bg-gray-900 text-white underline underline-offset-[5px] decoration-green' type='text' placeholder='jimmyfallon@grow.com'></input>
            <button className='font-bold font-sans text-white hover:text-green-600 absolute'>GO</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer