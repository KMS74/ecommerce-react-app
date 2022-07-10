// All the logic about HomeCategory component
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { getAllCategory } from '../../redux/actions/categoryAction';

const HomeCategoryHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);
  console.log(category.data);
  const colors = [
    '#FFD3E8',
    '#F4DBA5',
    '#55CFDF',
    '#FF6262',
    '#0034FF',
    '#FFD3E8',
  ];
  return [category, loading, colors];
};
export default HomeCategoryHook;
