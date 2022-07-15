// All the logic about HomeCategory component
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { getAllCategory } from '../../redux/actions/categoryAction';

const HomeCategoryHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const allCategory = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);
  const colors = [
    '#FFD3E8',
    '#F4DBA5',
    '#55CFDF',
    '#FF6262',
    '#0034FF',
    '#FFD3E8',
  ];

  let category = [];
  try {
    if (allCategory.data) {
      category = allCategory.data.slice(0, 5);
      console.log('THE FIRST FIVE CATEGORIES:');
      console.log(category);
    } else {
      category = [];
    }
  } catch (e) {
    console.log(e);
  }

  return [category, loading, colors];
};
export default HomeCategoryHook;
