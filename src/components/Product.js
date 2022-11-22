import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='h3'>${product.price}</Card.Text>
                <Button variant="primary">Add to cart</Button>
            </Card.Body>


        </Card >
    );
};

export default Product;