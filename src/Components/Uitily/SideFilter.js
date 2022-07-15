import React from 'react';
import { Row } from 'react-bootstrap';
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo] =
    SidebarSearchHook();

  const localFrom = localStorage.getItem('priceFrom');
  const localTo = localStorage.getItem('priceTo');

  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input onChange={clickCategory} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {category ? (
            category.map((item, index) => {
              return (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={clickCategory}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              );
            })
          ) : (
            <h6>لا يوجد تصنيفات</h6>
          )}
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>
          <div className="d-flex mt-3">
            <input onChange={clickBrand} type="checkbox" value="0" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {brand ? (
            brand.map((item, index) => {
              return (
                <div key={index} className="d-flex mt-3">
                  <input
                    onChange={clickBrand}
                    type="checkbox"
                    value={item._id}
                  />
                  <div className="filter-sub me-2 ">{item.name}</div>
                </div>
              );
            })
          ) : (
            <h6>لا يوجد ماركات</h6>
          )}
        </div>

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{ width: '50px', height: '25px' }}
            onChange={priceFrom}
            value={localFrom}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{ width: '50px', height: '25px' }}
            onChange={priceTo}
            value={localTo}
          />
        </div>
      </Row>
    </div>
  );
};

export default SideFilter;
