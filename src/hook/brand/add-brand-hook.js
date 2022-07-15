// All the logic about adding a new brand
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { createBrand } from '../../redux/actions/brandAction';
import notify from '../useNotifaction';
import avatar from '../../images/avatar.png';
const AddBrandHook = () => {
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState('');
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const res = useSelector((state) => state.allBrand.brand);

  const dispatch = useDispatch();

  //  set brand name
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

  // post new brand data
  const handelSubmit = async (event) => {
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
    await dispatch(createBrand(formData));
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
        notify('تمت عملية الاضافة بنجاح', 'success');
      } else {
        notify('هناك مشكله فى عملية الاضافة', 'error');
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
export default AddBrandHook;
