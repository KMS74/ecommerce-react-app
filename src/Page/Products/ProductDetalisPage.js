import React from 'react';
import { Container } from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import ProductDetalis from '../../Components/Products/ProductDetalis';
import RateContainer from '../../Components/Rate/RateContainer';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';
import { useParams } from 'react-router-dom';

const ProductDetalisPage = () => {
  const { id } = useParams();

  const [, , , , , similarProducts] = ViewProductsDetalisHook(id);

  return (
    <div style={{ minHeight: '670px' }}>
      <CategoryHeader />
      <Container>
        <ProductDetalis />
        <RateContainer />
        <CardProductsContainer
          products={similarProducts}
          title="منتجات قد تعجبك"
        />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;
