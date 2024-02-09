// src/ImageGenerator.js
import React, { useRef, useState, useEffect } from 'react';
import Styles from './imagepage.module.css'
import axios from 'axios';
import LoadingSpinner from './loader';

const { faker } = require('@faker-js/faker');



const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (prompt) {
            generateImage();
            generateFakeData(prompt, 2)
        }
    }, [prompt]);

    const generateFakeData = (keyword, count) => {
        const products = [];
        for (let i = 0; i < count; i++) {
            const product = {
                name: faker.commerce.productName(),
                category: keyword ? keyword : faker.commerce.department(), // Use the user input as the category or keyword
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
            };
            products.push(product);
        }
        setProducts(products);
    };

    const generateImage = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'https://api.openai.com/v1/images/generations',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_API}`,
                        'User-Agent': 'Chrome',
                    },
                    body: JSON.stringify({
                        prompt: prompt + " vector icon",
                        n: 1,
                        size: "512x512",
                    })
                }
            );

            let data = await response.json()
            let data_array = data.data
            setImageUrl(data_array[0].url)
        } catch (error) {
            console.error('Error generating image:', error);
        }
        setLoading(false);
    };

    return (
        <div className={Styles["page"]}>
            <h1 className={Styles['page-title']}>Product Idea</h1>
            <br />
            <div className={Styles['logo']}>
                <input
                    type="text"
                    placeholder="Enter Food..."
                    className={Styles['input']}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                {loading && <LoadingSpinner />}
                {imageUrl && (
                    <div>
                        <img src={imageUrl} className={Styles['picLogo']} alt="Generated" />
                    </div>
                )}
            </div>
            <br /><br />
            <div>
                {products.length > 0 && (
                    <ul>
                        {products.map((product, index) => (
                            <div className={Styles['productList']}>
                                <p key={index}>
                                    {product.name}<hr />
                                    <strong>Price:</strong>{' '}
                                    {product.price},<br />
                                    <strong>Description:</strong> {product.description}
                                </p>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;
