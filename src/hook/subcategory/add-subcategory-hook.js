// All the logic about adding a new sub category
import { useEffect, useState } from 'react';
import { createSubCategory } from '../../redux/actions/subcategoryAction';
import { useSelector, useDispatch } from 'react-redux';
import notify from '../../hook/useNotifaction';
import { getAllCategory } from '../../redux/actions/categoryAction';

const AddSubcategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // check internet connection
    if (!navigator.onLine) {
      notify('هناك مشكله فى الاتصال بالانترنت', 'warn');
      return;
    }
    dispatch(getAllCategory());
  }, [dispatch]);

  const [cateId, setCateId] = useState('0');
  const [subCateName, setSubCateName] = useState('');
  const [loading, setLoading] = useState(true);

  // getting all categories from redux store
  const category = useSelector((state) => state.allCategory.category);

  // getting all sub categories from redux store
  const subcategory = useSelector((state) => state.subCategory.subcategory);

  if (category) {
    console.log(category);
  }
  // handel changing dropdown menu options
  const handelChange = (e) => {
    setCateId(e.target.value);
  };

  const onChangeName = (e) => {
    e.persist();
    setSubCateName(e.target.value);
  };
  // handel adding a new sub category
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify('هناك مشكله فى الاتصال بالانترنت', 'warn');
      return;
    }
    if (cateId === '0') {
      notify('من فضلك اختر تصنيف رئيسي', 'warn');
      return;
    }
    if (subCateName === '') {
      notify('من فضلك ادخل اسم التصنيف الفرعي ', 'warn');
      return;
    }

    setLoading(true);
    await dispatch(
      createSubCategory({
        name: subCateName,
        category: cateId,
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    if (loading === false) {
      // clears input data
      setSubCateName('');
      setCateId('0');
      if (subcategory.status === 201) {
        notify(' تم اضافة التصنيف الفرعي بنجاح', 'success');
      } else if (
        subcategory === 'Error AxiosError: Request failed with status code 400'
      ) {
        notify('  هذا الاسم مكرر من فضلك اختر اسم اخر', 'error');
      } else {
        notify('هناك مشكلة في عملية الاضافة', 'error');
      }
      setLoading(true);
    }
  }, [loading, subcategory]);

  return [subCateName, category, handelChange, handelSubmit, onChangeName];
};

export default AddSubcategory;
