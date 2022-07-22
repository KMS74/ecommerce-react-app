import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import CardContainerHook from './../../hook/products/card-container-hook';

const CardProductsContainer = ({
  title,
  btntitle,
  pathText,
  products,
  flag,
}) => {
  const [favProd] = CardContainerHook();

  return (
    <Container>
      {products ? (
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      ) : null}
      <Row className="my-2 d-flex justify-content-between">
        {products
          ? products.map((item, index) => (
              <ProductCard
                favProd={favProd}
                key={index}
                item={item}
                flag={flag}
              />
            ))
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
  flag: PropTypes.bool,
};

export default CardProductsContainer;
