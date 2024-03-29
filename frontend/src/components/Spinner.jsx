import React from 'react'
import Loader from 'react-loader-spinner';

const Spinner = ({message}) => {
    return (
        <div className='flex flex-col 
                        justify-center items-center 
                        w-full h-full'>
            <Loader
                type='BallTriangle'
                color='#00BFFF'
                height={50}
                width={200}
                className='m-5'
            />
            <p className='text-lg text-center px-2'>
                <span className='text-sm'>{message}</span>
            </p>
        </div>
    )
}

export default Spinner
