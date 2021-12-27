import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

import { SearchQuery, feedQuery } from '../utils/data'

const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(null)
    const { categoryId } = useParams();


    useEffect(() => {
        setLoading(true);

        if(categoryId){
            const query = SearchQuery(categoryId)
            client.fetch(query)
            .then((data)=>{
                setPins(data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setPins(null);
                setLoading(false);
            })
        } else {
            client.fetch(feedQuery)
            .then((data)=>{
                setPins(data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setPins(null);
                setLoading(false);
            })
        }

    }, [categoryId])

    if (loading) return (<Spinner message={`${categoryId? categoryId:'Images'} Loading`} />)

    return (
        <div>
            {pins?.length > 0 ? <MasonryLayout pins = {pins} /> : (

            <div className='flex flex-col 
                justify-center items-center 
                w-full h-full'
            >
                <p className='text-lg text-center px-2 text-semibold'>
                    <span className='text-sm'>OOPS!! We currently have no {categoryId? categoryId:'Images'} {categoryId? 'Images':''}</span>
                </p>
            </div>
            )}
        </div>
    )
}

export default Feed
