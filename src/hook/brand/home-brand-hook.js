// All the logic about BrandFeatured component

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { getAllBrand } from './../../redux/actions/brandAction';

const HomeBrandHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  const allBrand = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);

  let brand = [];

  try {
    if (allBrand.data) {
      brand = allBrand.data.slice(0, 5);
      console.log('THE FIRST FIVE BRANDS:');
      console.log(brand);
    } else {
      brand = [];
    }
  } catch (e) {
    console.log(e);
  }

  return [brand, loading];
};
export default HomeBrandHook;
