import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubTiltle = ({ title, btntitle, pathText }) => {
  return (
    <div className="d-flex justify-content-between pt-4">
      <div className="sub-tile">{title}</div>
      {btntitle ? (
        <Link to={`${pathText}`} style={{ textDecoration: 'none' }}>
          <div className="shopping-now">{btntitle}</div>
        </Link>
      ) : null}
    </div>
  );
};

SubTiltle.propTypes = {
  title: PropTypes.string,
  btntitle: PropTypes.string,
  pathText: PropTypes.string,
};
export default SubTiltle;
