import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allReviewProduct } from './../../redux/actions/reviewAction';

const ViewAllReviewHook = (id) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const allReview = useSelector(
    (state) => state.reviewReducer.allReviewProduct
  );

  useEffect(() => {
    setLoading(true);
    // displaying five review per page
    dispatch(allReviewProduct(id, 1, 5));
    setLoading(false);
  }, []);

  const onPress = async (page) => {
    // displaying five review per page
    await dispatch(allReviewProduct(id, page, 5));
  };

  return [allReview, onPress];
};

export default ViewAllReviewHook;
