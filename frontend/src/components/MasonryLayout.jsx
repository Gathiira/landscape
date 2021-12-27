import React from 'react';
import Masonry from 'react-masonry-css';

import Pin from './Pin';

const breakpointObj = {
    default: 4,
    3000: 3,
    2000: 3,
    1200: 2,
    1000: 2,
    500: 1,
}

const MasonryLayout = ({pins}) => {
    return (
        <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
            {pins.map((pin)=>(
                <Pin key={pin._id} pin={pin} className='w-max' />
            ))}
        </Masonry>
    )
}

export default MasonryLayout
