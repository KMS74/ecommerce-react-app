import {
  GET_ERROR,
  CREATE_SUB_CATEGORY,
  GET_SUB_CATEGORY_IN_CATEGORY,
} from './../type';
import { useInsertData } from '../../hooks/useInsertData';
import useGetData from '../../hooks/useGetData';

// creating a new sub category
export const createSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/subcategories`, data);

    dispatch({
      type: CREATE_SUB_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// getting all sub categories inside the main category
export const getAllSubCatInCate = (categoryId) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/categories/${categoryId}/subcategories`
    );
    console.log('All Subcategories in Category:');
    console.log(response.data);
    dispatch({
      type: GET_SUB_CATEGORY_IN_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};
