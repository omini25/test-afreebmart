import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductCard from "./ProductCard.jsx";
import styles from "../../styles/styles.js";
import {server} from "../../server.js";

export const SuggestProducts = (product) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/products`);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);



    return (
        <>
            <div>
                {products ? (
                    <div className={`p-4 ${styles.section}`}>
                        <h2
                            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
                        >
                            Related Product
                        </h2>
                        <div
                            className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                            {
                                products && products.map((i, index) => (
                                    <ProductCard data={i} key={index}/>
                                ))
                            }
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default SuggestProducts;