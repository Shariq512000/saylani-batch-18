import { getSigleProduct } from '@/api-endpoints';
import ProductDetail from '@/app/components/ProductDetail';
import React from 'react'

const Page = async ({ params }) => {
    const { id } = await params;
    const data = await getSigleProduct(id);
    console.log("datadata", data)
    return (
        <ProductDetail product={data} />
    )
}

export default Page