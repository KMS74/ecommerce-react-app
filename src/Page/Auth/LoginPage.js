import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginHook from '../../hook/auth/login-hook';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    OnSubmit,
    isPress,
  ] = LoginHook();

  return (
    <Container style={{ minHeight: '680px' }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">تسجيل الدخول</label>
          <input
            placeholder="الايميل"
            type="text"
            className="user-input my-3 text-center mx-auto"
            value={email}
            onChange={onChangeEmail}
          />
          <input
            placeholder="كلمه السر"
            type="password"
            className="user-input text-center mx-auto"
            value={password}
            onChange={onChangePassword}
          />
          <button onClick={OnSubmit} className="btn-login mx-auto mt-4">
            تسجيل الدخول
          </button>

          <label className="mx-auto my-3">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <span>ليس لديك حساب ؟</span>
            </Link>
          </label>

          <label className="mx-auto my-3">
            <Link
              to="/user/forget-password"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              <span style={{ cursor: 'pointer' }} className="text-danger">
                هل نسيت كلمة السر؟
              </span>
            </Link>
          </label>

          {isPress === true ? (
            loading === true ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : null
          ) : null}

          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
