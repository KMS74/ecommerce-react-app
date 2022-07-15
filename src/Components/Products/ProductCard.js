import React from 'react';
import { Card, Col } from 'react-bootstrap';
import favoff from '../../images/fav-off.png';
import rate from '../../images/rate.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const ProductCard = ({ item }) => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      <Card
        className="my-2"
        style={{
          width: '100%',
          height: '345px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 2px 0 rgba(151,151,151,0.5)',
        }}
      >
        <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
          <Card.Img
            style={{ height: '228px', width: '100%' }}
            src={item.imageCover}
          />
        </Link>
        <div className="d-flex justify-content-end mx-2">
          <img
            src={favoff}
            alt=""
            className="text-center"
            style={{
              height: '24px',
              width: '26px',
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <p className="card-title">{item.title}</p>
          </Card.Title>
          {/* <Card.Text> */}
          {/* Card.Text renders as p tag so we shouldn't nesting div inside p */}
          <div className="d-flex justify-content-between ">
            <div className="d-flex">
              <img className="" src={rate} alt="" height="16px" width="16px" />
              <div className="card-rate mx-2">{item.ratingsQuantity}</div>
            </div>
            <div className="d-flex">
              <div className="card-price">{item.price}</div>
              <div className="card-currency mx-1">جنيه</div>
            </div>
          </div>
          {/* </Card.Text> */}
        </Card.Body>
      </Card>
    </Col>
  );
};
ProductCard.propTypes = {
  item: PropTypes.object,
};
export default ProductCard;
