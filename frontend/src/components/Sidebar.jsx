import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import {FcHome} from 'react-icons/fc';
import {IoIosArrowForward} from 'react-icons/io';
import { FcLandscape } from 'react-icons/fc'

import logo from '../assets/logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle  = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';


const Sidebar = ({user, closeToggle}) => {
    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false)
        }
    }
    return (
        <div className='flex flex-col justify-between bg-white h-full 
                        overflow-y-scroll min-w-200 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link
                    to='/'
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <img src={logo} alt="logo"  className='w-full bg-gray-50'/>
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink 
                        to='/'
                        className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <FcHome />Home
                    </NavLink>
                    <h3 className='mt-2 px-5 text-bold 2xl:text-xl text-green-400'>Categories</h3>
                    {
                        categories.slice(0, categories.length -1).map((category)=>(
                            <NavLink
                                to={`/category/${category.name}`}
                                className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                                onClick={handleCloseSidebar}
                                key={category.name}
                            >
                                <FcLandscape />
                                {category.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            { user && (
                <Link
                    to={`profile/${user._id}`}
                    className='flex my-5 mx-3 mb-3 p-2 gap-2 items-center bg-white rounded-lg shadow-lg' 
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} alt="profile" className='w-8 h-8 rounded-full' />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    )
}

export default Sidebar
