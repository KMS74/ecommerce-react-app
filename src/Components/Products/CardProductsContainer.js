import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const CardProductsContainer = ({ title, btntitle, pathText }) => {
  return (
    <Container>
      <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      <Row className="my-2 d-flex justify-content-between">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>
    </Container>
  );
};

CardProductsContainer.propTypes = {
  title: PropTypes.string,
  btntitle: PropTypes.string,
  pathText: PropTypes.string,
};

export default CardProductsContainer;
