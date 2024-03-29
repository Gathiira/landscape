import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc';
import {client} from '../client';
import {v4 as uuidv4} from 'uuid'

import shareVideo from '../assets/share.mp4';
import shareLogo from '../assets/logowhite.png'


const Login = () => {
    const navigate = useNavigate()

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response?.profileObj));

        const { name, googleId, imageUrl} = response?.profileObj

        const doc = {
            _id: googleId ? googleId : uuidv4(),
            _type: 'user',
            userName: name ? name : "Anonymous",
            image: imageUrl ? imageUrl :""
        }
        client.createIfNotExists(doc)
        .then(()=>{
            navigate('/', {replace:true})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const failedResponse = (response) =>{
        console.log(response);
        window.alert('Failed to Login. Try again Later')
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video 
                    src={shareVideo} 
                    type = 'video/mp4'
                    loop
                    controls = {false}
                    muted
                    autoPlay
                    className='h-full w-full object-cover'
                />
                <div className='absolute flex flex-col 
                                justify-center items-center 
                                top-0 right-0 left-0 bottom-0 
                                bg-blackOverlay'>
                    <div className='p-5'>  
                        <img src={shareLogo} alt="logo"  width='130px' 
                            onClick={()=> navigate('/')}
                            className='cursor-pointer'
                        />
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_ID}
                            render={(renderProps) => (
                                <button 
                                    type='button'
                                    className='bg-green-300 
                                                flex justify-center
                                                items-center p-3 rounded-lg 
                                                cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled = {renderProps.disabled}
                                > 
                                    <FcGoogle className='mr-4' /> Link Twinkle with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={failedResponse}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                    <div className='p-2'>  
                        <p 
                            className='text-green-700 rounded-lg 
                                        cursor-pointer outline-none'
                            onClick={()=> navigate('/')}
                        > 
                            Explore Images Instead
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
