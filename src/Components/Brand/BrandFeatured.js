import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle';
import BrandCard from './BrandCard';
import PropTypes from 'prop-types';
import HomeBrandHook from '../../hook/brand/home-brand-hook';

const BrandFeatured = ({ title, btntitle }) => {
  const [brand, loading] = HomeBrandHook();
  console.log(brand);
  return (
    <Container>
      {brand.data ? (
        <div>
          <SubTiltle title={title} btntitle={btntitle} pathText="/allbrand" />
          <Row className="my-1 d-flex justify-content-between">
            {loading === false ? (
              // ? if there are brands?
              brand.data.length > 0 ? (
                // * display the first six brands
                brand.data.slice(0, 5).map((item, index) => {
                  return <BrandCard key={item._id} img={item.image} />;
                })
              ) : (
                <h4>لا يوجد ماركات</h4>
              )
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Row>
        </div>
      ) : null}
    </Container>
  );
};
BrandFeatured.propTypes = {
  title: PropTypes.string,
  btntitle: PropTypes.string,
};
export default BrandFeatured;
