import React, {useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {v4 as uuidv4 } from 'uuid';
import {HiOutlineDownload } from 'react-icons/hi';
import {AiTwotoneDelete} from 'react-icons/ai';

import { urlFor, client } from '../client';
import { fetchUser } from '../utils/fetchUser';


const Pin = ({pin:{postedBy, image, _id, save, category, title}}) => {
    const [postHovered, setPostHovered] = useState(false);
    const navigate = useNavigate();
    const user = fetchUser();

    const alreadySaved = !!(save?.filter((item=> item.postedBy?._id === user?.googleId)))?.length;

    const savePin = (id) => {

        if(!alreadySaved){
            client
            .patch(id)
            .setIfMissing({save:[]})
            .insert('after', 'save[-1]', [{
                _key:uuidv4(),
                userId: user?.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user?.googleId
                }
            }])
            .commit()
            .then(()=> {
                window.location.reload();
            })
        }
    }

    const deletePin = (id) => {
        console.log('clicked');
        client
        .delete(id)
        .then(()=>{
            window.location.reload();
        })
    }

    return (
        <div className='m-4'>
            <div
                onMouseEnter={()=>setPostHovered(true)}
                onMouseLeave={()=>setPostHovered(false)}
                onClick={()=> navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto 
                            hover:shadow-lg rounded-lg 
                            overflow-hidden transition-all 
                            duration-500 ease-in-out'
            >
                <img src={urlFor(image).width(250).url()} alt="pin" className='rounded-lg w-full' />

                {postHovered && (
                    <div 
                        className='absolute top-0 w-full h-full 
                                    flex flex-col justify-between
                                    p-1 pr-2 pt-2 pb-2 z-50'
                        style={{height:'100%'}}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a 
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e)=> e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full 
                                                flex items-center justify-center 
                                                text-dark text-xl opacity-75 
                                                hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <HiOutlineDownload />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button
                                    className='bg-red-500
                                        hover:opacity-100 text-white 
                                        font-bold px-5 py-1 text-base 
                                        rounded-lg hover:shadow-md outline-none'
                                    type='button'
                                    onClick={(e)=> {
                                        e.stopPropagation()
                                    }}
                                >
                                    {save?.length} {save?.length > 1? 'Likes': "Like"} 
                                </button>
                            ): (
                                <button
                                    className='bg-red-500 opacity-75 
                                                hover:opacity-100 text-white 
                                                font-bold px-5 py-1 text-base 
                                                rounded-lg hover:shadow-md outline-none'
                                    type='button'
                                    onClick={(e)=> {
                                        e.stopPropagation()
                                        savePin(_id);
                                    }}
                                >
                                    Like
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            <Link to={`/profile/${postedBy?._id}`}
                                className='flex gap-2 mt-2 items-center'
                                onClick={(e)=> {
                                    e.stopPropagation();
                                    deletePin(_id);
                                }}
                            >
                                <img 
                                    className='w-8 h-8 rounded-full object-cover'
                                    src={postedBy?.image} 
                                    alt="profile" />
                                <p className='font-semibold text-white capitalize'>{postedBy?.userName}</p>
                            </Link>
                            {postedBy?._id === user?.googleId && (
                                <button
                                    type='button'
                                    onClick={(e)=> {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}
                                    className='bg-red-600 p-2 opacity-75 
                                    hover:opacity-100 text-dark 
                                    font-bold text-base 
                                    rounded-3xl hover:shadow-md outline-none'
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className='flex gap-2 items-center'>
                {category?.slice(0,3).map((category,i)=>(
                        <Link 
                            key={i}
                            to={`/category/${category}`}
                        >
                            <p 
                                className='font-semibold text-gray-400 
                                capitalize hover:text-gray-800'
                            >
                                {category}
                            </p>
                        </Link>
                ))}
            </div>
        </div>
    )
}

export default Pin
