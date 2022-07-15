import React from 'react';
import { Row } from 'react-bootstrap';
import AdminAllProductsCard from './AdminAllProductsCard';
import PropTypes from 'prop-types';

const AdminAllProducts = ({ products }) => {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        {products ? (
          products.map((item, index) => (
            <AdminAllProductsCard item={item} key={index} />
          ))
        ) : (
          <h4>لا يوجد منتجات حتي الان</h4>
        )}
      </Row>
    </div>
  );
};
AdminAllProducts.propTypes = {
  products: PropTypes.array,
};
export default AdminAllProducts;
