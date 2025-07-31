import React from 'react'
import Banner from './banner'
import BannerContent from './blogContent'

const index = ({ blogData }) => {
    return (
        <>
            <Banner />
            <BannerContent blogData={blogData} />
        </>
    )
}

export default index