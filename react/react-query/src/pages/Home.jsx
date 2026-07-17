import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Home = () => {

    const getApiData = async () => {
        try {
            const apiData = await axios.get('https://dummyjson.com/products')
            return apiData.data
        } catch (error) {
            console.log("Err", error)
        }
    }

    const query = useQuery({ queryKey: ['products'], queryFn: getApiData });

    return (
        <div>
            {query.isLoading ?
                <h1>Loading...</h1>
                :
                query.data?.products?.map((eachItem) => {
                    return (
                        <div className="" key={eachItem.id}>
                            {eachItem.title}
                        </div>
                    )
                })}
        </div>
    )
}

export default Home