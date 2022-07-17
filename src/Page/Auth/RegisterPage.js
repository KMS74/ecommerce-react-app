import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterHook from '../../hook/auth/register-hook';
import { ToastContainer } from 'react-toastify';

const RegisterPage = () => {
  const [
    name,
    email,
    phone,
    password,
    confirmPassword,
    // eslint-disable-next-line no-unused-vars
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    OnSubmit,
  ] = RegisterHook();

  return (
    <Container style={{ minHeight: '680px' }}>
      <Row className="py-5 d-flex justify-content-center hieght-search">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">تسجيل حساب جديد</label>
          <input
            placeholder="اسم المستخدم"
            type="text"
            className="user-input mt-3 text-center mx-auto"
            value={name}
            onChange={onChangeName}
          />
          <input
            placeholder="الايميل"
            type="text"
            className="user-input my-3 text-center mx-auto"
            value={email}
            onChange={onChangeEmail}
          />
          <input
            placeholder="الهاتف"
            type="phone"
            className="user-input text-center mx-auto"
            value={phone}
            onChange={onChangePhone}
          />
          <input
            placeholder="كلمه السر"
            type="password"
            className="user-input mt-3 text-center mx-auto"
            value={password}
            onChange={onChangePassword}
          />
          <input
            placeholder="تأكيد كلمة السر"
            type="password"
            className="user-input mt-3 text-center mx-auto"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <button onClick={OnSubmit} className="btn-login mx-auto mt-4">
            تسجيل الحساب
          </button>
          <label className="mx-auto my-4">
            لديك حساب بالفعل؟
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span style={{ cursor: 'pointer' }} className="text-primary">
                اضغط هنا
              </span>
            </Link>
          </label>
        </Col>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default RegisterPage;
