import React, {useEffect, useState} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

import {client } from '../client'
import Spinner from './Spinner';
import { fetchCategories } from '../utils/data';

const CreatePin = ({user}) => {
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [category, setCategory] = useState([])
    const [imageAsset, setImageAsset] = useState(null)
    const [wrongImageType, setWrongImageType] = useState(false)
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    const uploadImage = (e) => {
        const {type, name} = e.target.files[0]
        if (type ==='image/png' 
            || type ==='image/svg' 
            || type ==='image/jpeg' 
            || type ==='image/gif' 
            || type ==='image/tiff' 
            || type ==='image/jpg' 
            || type ==='image/webp' 
            ){
                setWrongImageType(false)
                setLoading(true);
                client.assets
                .upload('image', e.target.files[0], {contentType: type, filename : name})
                .then((document)=>{
                    setImageAsset(document)
                    setLoading(false)
                })
                .catch((error)=>{
                    console.log('image upload error  ', error);
                })
        } else {
            setWrongImageType(true)
        }

    }

    const savePin = () => {
        const _categories = category.map(({ name }) => name);
        const fieldExist = title && about && imageAsset?._id && _categories
        if(fieldExist){
            setFields(false)
            const doc = {
                _type: 'pin',
                title,
                about,
                image :{
                    _type:'image',
                    asset:{
                        _type:'reference',
                        _ref: imageAsset?._id
                    },
                },
                userId : user?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id
                },
                category: _categories
            }
            client.create(doc)
            .then((data)=>{
                navigate('/')
            })
            .catch((error)=>{
                console.log(error);
            })

        } else {
            setFields(true)
            setTimeout(()=> setFields(false), 3000)
        }

    }

    const handleCategory = (category) =>{
        setCategory(category|| [])
    }

    useEffect(() => {
        client.fetch(fetchCategories)
        .then((data)=>{
            setCategories(data)
        })
    }, [])

    if(!user) {
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
            {fields && (
                <p className='text-red-500 mb-5 text-xl translate-all duration-150 ease-in'>
                    Please fill in all the fields
                </p>
            )}
            <div className='flex lg:flex-row flex-col 
                            justify-center items-center 
                            bg-white lg:pd-3 pd-3 lg:w-5/6 w-full'
            >
                <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
                    <div 
                        className='flex justify-center items-center 
                                    flex-col border-2 border-dotted 
                                    border-gray-300 p-3 w-full h-420'
                    >
                        {loading && (<Spinner />)}
                        {wrongImageType && (<p> Wrong Image type</p>)}
                        {!imageAsset ? (
                            <label>
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <div className='flex flex-col justify-center items-center
                                                cursor-pointer hover:text-3xl'>
                                        <input 
                                            type="file"
                                            name='upload-image'
                                            onChange={(e)=> {
                                                if(!loading){
                                                    setLoading(true);
                                                    uploadImage(e)
                                                } else {
                                                    e.stopPropagation();
                                                }
                                            }}
                                            className='w-0 h-0'
                                        />
                                        <p className='font-bold text-2xl'>
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className='text-lg'>{!loading ? "Click to Upload" :"Uploading ..."}</p>
                                    </div>
                                    <p className='mt-20 text-gray-400'>
                                        Use high Quality JPG, SVG, PNG, Webp or GIF less than 20 MB
                                    </p>
                                </div>
                            </label>
                        ): (
                            <div className='relative h-full'>
                                <img src={imageAsset?.url} alt="uploads" className='h-full w-full' />
                                <button
                                    type='button'
                                    className='absolute bottom-3 right-3 p-3 
                                                rounded-full bg-white text-xl 
                                                cursor-pointer outline-none 
                                                hover:shadow-md transition-all 
                                                duration-500 ease-in-out'
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
                    {user && (
                        <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
                            <img src={user.image} alt="profile" className='w-10 h-10 rounded-full' />
                            <p className='font-bold'>{user.userName}</p>
                        </div>
                    )}
                    <input 
                        type="text"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder='Add Image title here'
                        className='outline-none text-xl 
                                    sm:text-3xl font-semibold border-b-2 
                                    border-gray-200 p-2'
                    />
                    <textarea 
                        name="About" id="" 
                        value={about}
                        onChange={(e)=> setAbout(e.target.value)}
                        className='outline-none text-base 
                                    sm:text-lg border-b-2 
                                    border-gray-200 p-2'
                        cols="30" rows="3" 
                        placeholder='Add Image description here' />

                    <Select 
                        options={categories}
                        value={category}
                        onChange={handleCategory}
                        className='outline-none w-full text-base  
                                border-gray-200 rounded-md cursor-pointer'
                        isMulti
                        makeAnimated
                        placeholder='Select Category' />

                    
                    <button 
                        type='button'
                        className='bg-green-500 text-white font-bold p-2 rounded-lg outline-none'
                        onClick={savePin}
                    >
                        Save Image
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePin
