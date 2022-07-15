// All the logic about adding a new category
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { createCategory } from '../../redux/actions/categoryAction';
import notify from '../useNotifaction';
import avatar from '../../images/avatar.png';
const AddCategoryHook = () => {
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState('');
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const res = useSelector((state) => state.allCategory.category);
  const dispatch = useDispatch();

  //  set category name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedImgFile(event.target.files[0]);
    }
  };

  // post new category data
  const handelSubmit = (event) => {
    event.preventDefault();
    if (name === '' || selectedImgFile === null) {
      notify('من فضلك قم بادخال جميع البيانات', 'warn');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', selectedImgFile);
    setLoading(true);
    setIsPress(true);
    console.log('all done!');
    dispatch(createCategory(formData));
    setLoading(false);
  };

  // when the loading status is cahnged perform this function
  useEffect(() => {
    if (loading === false) {
      console.log('loading is finished!');
      // clear input data
      setImg(avatar);
      setName('');
      setSelectedImgFile(null);
      console.log('all done!');
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);

      if (res.status === 201) {
        // TODO ???
        notify('هناك مشكله فى عملية الاضافة', 'error');
      } else {
        notify('تمت عملية الاضافة بنجاح', 'success');
      }
    }
  }, [loading, res.status]);

  return [
    img,
    name,
    loading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeName,
  ];
};
export default AddCategoryHook;
