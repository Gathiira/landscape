import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Routes, Route} from 'react-router-dom';

import { userQuery } from '../utils/data';
import {Sidebar, Profile} from '../components';
import { client } from '../client';
import logo from '../assets/logo.png'

import Pins from './Pins'
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const scrollRef = useRef(null)

    const userInfo = fetchUser()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)

        client.fetch(query)
        .then((data)=>{
            setUser(data[0])
        })

    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0,0)
    }, [])
      
    return (
        <div className='flex bg-gray-50
                        md:flex-row flex-col 
                        h-screen transition-height 
                        duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'>
                <Sidebar key={user?._id} user={user && user} closeToggle={setToggleSidebar} />
            </div>
            <div className='flex md:hidden flex-row'>
                <div className='p-2 w-full flex flex-3 gap-3 items-center shadow-md'>
                    <HiMenu fontSize={40} className='cursor-pointer flex-0' onClick={()=>setToggleSidebar(true)}/>
                    <Link to='/' className='flex-1'>
                        <img src={logo} alt="logo" className='w-14 h-14 rounded-lg'/>
                    </Link>
                    <Link to={`profile/${user?._id}`}>
                        <img src={user?.image} alt="profile" className='w-14 h-14 rounded-full'/>
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className='fixed w-2/4 bg-white 
                                    h-screen overflow-y-auto 
                                    shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle 
                                fontSize={30} 
                                className='cursor-pointer' 
                                onClick={()=> setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar key={user?._id} user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>
            <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/*' element={<Pins user={user && user} />} />
                </Routes>

            </div>
        </div>
    )
}

export default Home
