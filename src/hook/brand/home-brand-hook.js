// All the logic about BrandFeatured component

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { getAllBrand } from './../../redux/actions/brandAction';

const HomeBrandHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand());
  }, []);

  const brand = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);
  console.log(brand.data);

  return [brand, loading];
};
export default HomeBrandHook;
