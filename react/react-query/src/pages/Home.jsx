import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Home = () => {

    const queryClient = useQueryClient()

    const [pageNumber, setPageNumber] = useState(1)

    const getProducts = async () => {
        try {                                                        // 1 = 0, 2 = 10, 3 = 20, 5 = 40
            const apiData = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${(pageNumber - 1) * 10}&limit=10`)
            return apiData.data
        } catch (error) {
            console.log("Err", error)
        }
    }

    const query = useQuery({
        queryKey: ['products', pageNumber],
        queryFn: getProducts,
        // gcTime: 1000,
        // staleTime: 5000,
        // refetchInterval: 5000,
        // refetchIntervalInBackground: true
    });

    const addProduct = async () => {
        try {
            const apiRes = axios.post("https://api.escuelajs.co/api/v1/products", { name: "Test" })
        } catch (error) {

        }
    }


    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['products', pageNumber] })
        },
    })

    // const secondQuery = useQuery({
    //     queryKey: ['categories'],
    //     queryFn: getCategories
    // });

    return (
        <div>
            {
                query.isLoading ?
                    <p>Loading...</p>
                    :
                    query.data?.map((eachData) => (
                        <h2>{eachData.title}</h2>
                    ))
            }
            <button onClick={() => { setPageNumber(pageNumber - 1); }} disabled={pageNumber == 1}>Previous Page</button>
            {pageNumber}
            <button onClick={() => { setPageNumber((prev) => prev + 1) }}>Next Page</button>
        </div>
    )
}

export default Home