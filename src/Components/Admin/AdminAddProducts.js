import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { CompactPicker } from 'react-color';
import add from '../../images/add.png';
// TODO  Search of Invalid Hook Calling
import MultiImageInput from 'react-multiple-image-input';

import { ToastContainer } from 'react-toastify';
import AdminAddProductsHook from './../../hook/products/add-products-hook';

const AdminAddProducts = () => {
  const [
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeProductColor,
    onSelectCategory,
    handelSubmit,
    onSelectBrand,
    prodColors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    crop,
  ] = AdminAddProductsHook();
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>
          <MultiImageInput
            images={images}
            setImages={setImages}
            cropConfig={{ crop, ruleOfThirds: true }}
            theme={'light'}
            max={4}
          />
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
            value={prodName}
            onChange={onChangeProdName}
          />
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
            value={prodDescription}
            onChange={onChangeDesName}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
            value={priceBefore}
            onChange={onChangePriceBefor}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder=" السعر بعد الخصم"
            value={priceAftr}
            onChange={onChangePriceAfter}
          />
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة "
            value={qty}
            onChange={onChangeQty}
          />
          <select
            name="cat"
            className="select input-form-area mt-3 px-2"
            onChange={onSelectCategory}
          >
            <option value="0"> اختر التصنيف الرئيسي</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: 'red' }}
          />
          <select
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectBrand}
          >
            <option value="0"> اخترالماركة</option>
            {brand.data
              ? brand.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
          <div className="mt-1 d-flex">
            {prodColors.length >= 1
              ? prodColors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className="color ms-2 border  mt-1"
                      style={{ backgroundColor: color }}
                      onClick={() => removeProductColor(color)}
                    ></div>
                  );
                })
              : null}

            <img
              src={add}
              alt=""
              width="30px"
              height="35px"
              style={{ cursor: 'pointer' }}
              onClick={onChangeColor}
              className="ms-4"
            />
            {/* conditional rendering of show/hide color picker */}
            {showColor === true ? (
              <CompactPicker onChangeComplete={handelChangeComplete} />
            ) : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
          <ToastContainer />
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddProducts;
