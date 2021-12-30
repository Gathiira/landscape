import React, {useState, useEffect} from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import {pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import { Spinner, MasonryLayout } from '.';
import { IoMdLogIn } from 'react-icons/io';

const PinDetail = ({user}) => {
    const [pins, setPins] = useState(null)
    const [pinDetail, setPinDetail] = useState(null)
    const [comment, setComment] = useState('')
    const [addingComment, setAddingComment] = useState(false)

    const { pinId } = useParams();

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId)

        if (query) {
            client.fetch(query)
            .then((data)=>{
                setPinDetail(data[0])

                if(data[0]){
                    query = pinDetailMorePinQuery(data[0]);

                    client.fetch(query)
                    .then((res)=> setPins(res))
                }
            })
        }
    }
    useEffect(() => {
        fetchPinDetails()
    }, [pinId])

    const addComment = () => {
        if(comment) {
            setAddingComment(true);

            client.patch(pinId)
            .setIfMissing({comments:[]})
            .insert('after', 'comments[-1]', [{
                comment, 
                _key:uuidv4(),
                postedBy : {
                    _type: 'postedBy',
                    _ref: user?._id
                }
            }])
            .commit()
            .then(()=>{
                fetchPinDetails();
                setComment('');
                setAddingComment(false)
            })
        }
    }

    if(!pinDetail) return <Spinner message='More Info Incoming' />

    return (
        <>
        <div 
            className='flex xl-flex-row flex-col m-auto bg-white' 
            style={{maxWidth:'1500px', borderRadius:'32px'}}
        >
            <div className='flex justify-center items-center md:items-start flex-initial'>
                <img 
                    src={pinDetail?.image && urlFor(pinDetail.image).url() } alt="pin" 
                    className='rounded-t-3xl rounded-b-lg'
                />
            </div>
            <div className='w-full p-5 flex-1 xl:min-w-620'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl font-bold break-words mt-3'>{pinDetail.title}</h1>
                    </div>
                    <div className='flex gap-2 items-center'>
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
                            {pinDetail.save?.length} {pinDetail.save?.length > 1? 'Likes': "Like"} 
                        </button>
                        <a 
                            href={`${pinDetail.image.asset.url}?dl=`}
                            download
                            onClick={(e)=> e.stopPropagation()}
                            className='bg-white w-9 h-9 rounded-full'
                        >
                            <MdDownloadForOffline className='w-full h-full'/>
                        </a>
                    </div>
                </div>
                <div>
                    <p className='mt-3'><small>{pinDetail.about}</small></p>
                    <Link to={`/profile/${pinDetail.postedBy?._id}`}
                        className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                        onClick={(e)=> {
                            e.stopPropagation();
                        }}
                    >
                        By 
                        <img 
                            className='w-5 h-5 rounded-full object-cover'
                            src={pinDetail.postedBy?.image} 
                            alt="profile" />
                        <p className='capitalize'><small>{pinDetail.postedBy?.userName}</small></p>
                    </Link>
                    <h2 className='mt-5 text-xl'>Comments</h2>
                    <div className='max-h-370 overflow-y-auto'>
                        {pinDetail?.comments?.map((comment, i)=>(
                            <div 
                                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                                key={i}
                            >
                                <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                    <img 
                                        src={comment.postedBy.image} alt="comment" 
                                        className='w-5 h-5 rounded-full '
                                    />
                                    <p className='text-xs'>{comment.postedBy.userName} :</p>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {user ? (
                    <div className='flex flex-wrap items-center mt-6 gap-3'>
                        <img 
                            className='w-8 h-8 rounded-full object-cover'
                            src={user?.image} 
                            alt="profile" 
                        />
                        <input type="text" 
                            className='flex-1 border-gray-100 
                                        outline-none border-2 p-2 rounded-xl 
                                        focus:border-gray-300'
                            placeholder='Add a Comment'
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                        />
                        <button 
                            className='bg-green-500 text-white 
                                            rounded-xl px-6 py-2 fond-semibold 
                                            text-base outline-none'
                            onClick={addComment}
                        >
                            {addingComment ? "Posting":"Post"}
                        </button>
                    </div>
                ):(
                    <div className='flex flex-wrap items-center mt-6 gap-3'>
                        <IoMdLogIn />
                        <Link to='/login' className='text-blue-500'> Login to comment
                        </Link>
                    </div>
                )}
                
            </div>
        </div>

        {pins ? (
            <>
                <h2 className='text-center fond-bold text-2xl mt-8 mb-4'>
                    More Like this
                </h2>
                <MasonryLayout pins={pins} />
            </>
        ): (
            <Spinner message='Loading more Images ...' />
        )}

        </>
    )
}

export default PinDetail
