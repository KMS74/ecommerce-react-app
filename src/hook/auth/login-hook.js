import { useState, useEffect } from 'react';
import notify from './../useNotifaction';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authAction';

const LoginHook = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const OnSubmit = async () => {
    console.log('LOGIN');
    // TODO Validta input data (email, password)
    setIsPress(true);
    setLoading(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );

    setLoading(false);
    setIsPress(false);
  };

  const res = useSelector((state) => state.authReducer.loginUser);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);
        if (res.data.token) {
          // store the token to local storage
          localStorage.setItem('token', res.data.token);
          // store user info to local storage
          localStorage.setItem('user', JSON.stringify(res.data.data));
          notify('تم تسجيل الدخول بنجاح', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }

        if (res.data.message === 'Incorrect email or password') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          notify('كلمة السر او الايميل خطا', 'error');
        }
        setLoading(true);
      }
    }
  }, [loading]);

  return [
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    OnSubmit,
    isPress,
  ];
};

export default LoginHook;