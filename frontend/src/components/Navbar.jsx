import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {IoMdSearch, IoMdAdd, IoMdLogIn, IoMdLogOut} from 'react-icons/io'
import { GoogleLogout } from 'react-google-login';

const Navbar = ({searchTerm, setSearchTerm, user}) => {
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    
    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div 
            className='flex justify-start 
                    items-center w-full px-2 
                    rounded-md bg-white 
                    border-none outline-none 
                    focus-within:shadow-sm'
            >
                <IoMdSearch fontSize={21} className='ml-1' />
                <input 
                    type="text" 
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={searchTerm}
                    onFocus={()=>navigate('/search')}
                    className='bg-white p-2 outline-none w-full'
                />
            </div>
            {user ? (
                <div className='flex gap-3'>
                    <Link 
                        to='create-pin' 
                        className='bg-black text-white 
                                    rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
                    >
                        <IoMdAdd />
                    </Link>
                </div>
            ):(
                <Link 
                    to='/login' 
                    className='bg-black text-white 
                                rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
                >
                    <IoMdLogIn />
                </Link>
            )}
        </div>
    )
}

export default Navbar
