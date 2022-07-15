// All the logic about getting all brands
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { getAllBrand, getAllBrandPage } from '../../redux/actions/brandAction';

const AllBrandHook = () => {
  const dispatch = useDispatch();
  // When the component mounted to the DOM
  useEffect(() => {
    // limit = 4 '4 brands are displayed per page'
    dispatch(getAllBrand(4));
  }, [dispatch]);

  const brand = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);

  // to get page count
  let pageCount = 0;
  if (brand.paginationResult) {
    pageCount = brand.paginationResult.numberOfPages;
  }

  // When press on Pagination buttons
  const getPage = (page) => {
    console.log(page);
    dispatch(getAllBrandPage(page, 4));
  };

  return [brand, loading, pageCount, getPage];
};

export default AllBrandHook;
