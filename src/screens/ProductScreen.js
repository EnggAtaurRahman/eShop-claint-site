import React, { useState } from 'react';
import { useEffect } from 'react';
// import products from '../products';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { Row, Col, Image, Button, ListGroup, Form } from 'react-bootstrap';
import { listProductDetails } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductScreen = () => {
    const { id } = useParams();
    // const product = products.find((product) => product._id === id);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;


    useEffect(() => {
        dispatch(listProductDetails(id))

    }, [dispatch, id]);

    const navigate = useNavigate();
    const addToCartHandler = () => {
        let path = `/cart/${id}?qty=${qty}`;
        navigate(path);

    }
    return (
        <>
            <Link to='/' className='btn btn-dark mb-3 '>
                Go back
            </Link>
            <h1>this is product details page</h1>
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> :

                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews}`}>
                            </Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price};
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description};
                        </ListGroup.Item>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>

                                            <Form.Control

                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >

                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}

                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                            )}

                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add to cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>

            }




        </>
    );
};

export default ProductScreen;