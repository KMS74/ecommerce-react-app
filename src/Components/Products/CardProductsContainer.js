import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  return (
    <Container>
      {products ? (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      ) : null}
      <Row className="my-2 d-flex justify-content-between">
        {products
          ? products.map((item) => {
              return <ProductCard item={item} key={item._id} />;
            })
          : null}
      </Row>
    </Container>
  );
};

CardProductsContainer.propTypes = {
  title: PropTypes.string,
  btntitle: PropTypes.string,
  pathText: PropTypes.string,
  products: PropTypes.array,
};

export default CardProductsContainer;
