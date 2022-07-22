import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import notify from '../useNotifaction';
import { deleteReviewOnProduct } from './../../redux/actions/reviewAction';
const DeleteRateHook = (review) => {
  const dispatch = useDispatch();

  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShowDelete(false);
  const handleShow = () => setShowDelete(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (review.user._id === user._id) {
      setIsUser(true);
    }
  }, []);

  const handelDelete = async () => {
    setLoading(true);
    await dispatch(deleteReviewOnProduct(review._id));
    setLoading(false);
    handleClose();
  };

  const res = useSelector((state) => state.reviewReducer.deleteReview);

  useEffect(() => {
    if (loading === false) {
      console.log('deleting reviews:');
      console.log(res);
      if (res.status !== 400) {
        notify('تم حذف التقييم بنجاح', 'success');
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else notify('هناك مشكله فى عملية المسح', 'error');
    }
  }, [loading, res]);

  return [isUser, handelDelete, handleShow, handleClose, showDelete];
};

export default DeleteRateHook;
