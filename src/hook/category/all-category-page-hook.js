// All the logic about getting all categories
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import {
  getAllCategory,
  getAllCategoryPage,
} from '../../redux/actions/categoryAction';

const AllCategoryHook = () => {
  const dispatch = useDispatch();
  // When the component mounted to the DOM
  useEffect(() => {
    // limit = 6 '6 products are displayed per page'
    dispatch(getAllCategory(6));
  }, []);

  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // to get page count
  let pageCount = 0;
  if (category.paginationResult)
    pageCount = category.paginationResult.numberOfPages;

  // When press on Pagination buttons
  const getPage = (page) => {
    console.log(page);
    dispatch(getAllCategoryPage(page, 6));
  };

  return [category, loading, pageCount, getPage];
};

export default AllCategoryHook;
