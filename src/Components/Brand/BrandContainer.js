import React from 'react';
import BrandCard from './BrandCard';
import { Container, Row, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BrandContainer = ({ data, loading }) => {
  return (
    <Container>
      <div className="admin-content-text mt-2 ">كل الماركات</div>
      <Row className="my-1 d-flex justify-content-between">
        {loading === false ? (
          // ? if there are brands?
          data.length > 0 ? (
            // * display the first six brands
            data.slice(0, 5).map((item, index) => {
              return <BrandCard key={item._id} img={item.image} />;
            })
          ) : (
            <h4>لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
};
BrandContainer.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default BrandContainer;
