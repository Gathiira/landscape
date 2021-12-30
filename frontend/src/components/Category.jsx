import React, { useState, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Spinner } from '.'
import { client } from '../client'
import { fetchCategories } from '../utils/data'

const Category = () => {
    const [fields, setFields] = useState(null)
    const [name, setName] = useState('')
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)


    const saveCategory = () => {
        if(name){
            setFields(false)
            setLoading(true)
            const doc = {
                _type: 'category',
                name: name,
                label: name,
                value: name
            }
            client.create(doc)
            .then(()=>{
                console.log('Added');
                window.location.reload()
                setLoading(false)
            })
            .catch((error)=>{
                setLoading(false)
                console.log(error);
            })
        }else{
            setFields(true)
            setTimeout(()=> setFields(false), 3000)
        }
    }

    const deleteCategory = (cateId) =>{
        client.delete(cateId)
        .then(()=>{
            window.location.reload()
            setLoading(false)
        })
    }

    useEffect(() => {
        client.fetch(fetchCategories)
        .then((data)=>{
            setCategory(data)
        })
    }, [])

    return (
        <div className='flex flex-col justify-center items-center lg:h-2/5'>
            {fields && (
                <p className=' text-red-500 mb-5 text-xl translate-all duration-150 ease-in '>
                    Please fill in all the fields
                </p>
            )}
            <div className='flex flex-col justify-center items-center 
                            bg-gray-200 lg:pd-3 pd-3 lg:w-4/5 w-full'
            >
                <div className='flex flex-col lg:pl-5 mt-5 w-4/5'>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Add Category Name here'
                        className='outline-none border-b-2 p-2'
                    />
                    <button 
                        type='button'
                        className='bg-green-500 text-white p-2 rounded-lg outline-none 
                                    mt-5 mb-5'
                        onClick={saveCategory}
                    >
                        {loading ? 'Saving ': 'Save'}
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-3 lg:pd-3 pd-3 lg:w-4/5 w-full'>
                {category?.map((item,i) =>(
                    <div key={i}>
                        <div key={i} className='flex items-center justify-between p-2'>
                            <h5 key={i}>{i+1}. {item.name}</h5>
                            <AiOutlineDelete onClick={() => deleteCategory(item._id)} className='cursor-pointer text-red-700'/>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category
