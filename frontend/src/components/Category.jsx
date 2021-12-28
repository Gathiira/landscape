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
                name: name.toUpperCase(),
                label: name.toUpperCase(),
                value: name.toUpperCase()
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
        console.log('triggered');
        client.fetch(fetchCategories)
        .then((data)=>{
            setCategory(data)
        })
    }, [])

    return (
        <div className='flex flex-col justify-start items-start lg:h-2/5'>
            {fields && (
                <p className=' text-red-500 mb-5 text-xl translate-all duration-150 ease-in '>
                    Please fill in all the fields
                </p>
            )}
            <div className='flex flex-col justify-center items-center 
                            bg-gray-200 lg:pd-3 pd-3 lg:w-5/6 w-full'
            >
                <div className='flex flex-col lg:pl-5 mt-5 w-4/5'>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Add Category Name here'
                        className='outline-none border-b-2 
                                    border-gray-200 p-2'
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
            <div className='flex flex-col justify-start items-startn gap-3 p-2 w-4/5'>
                {category?.map((item) =>(
                    <>
                        <div key={item._id} className='flex items-center justify-between'>
                            <li key={item._id}>{item.name}</li>
                            <AiOutlineDelete onClick={() => deleteCategory(item._id)} />
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Category
