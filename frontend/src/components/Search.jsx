import React,{useState, useEffect} from 'react';

import { MasonryLayout, Spinner } from '.';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

const Search = ({searchTerm}) => {
    const [pins, setPins] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if(searchTerm){
            const searchQue = searchQuery(searchTerm)
            client.fetch(searchQue)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        } else {
            client.fetch(feedQuery)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
        }
    }, [searchTerm])
    return (
        <div>
            {loading && <Spinner message='Searching' /> }
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length ===0 && searchTerm !== '' && !loading && (
                <div className='mt-10 text-center text-xl'>
                    No Images Found !!
                </div>
            )}
        </div>
    )
}

export default Search
