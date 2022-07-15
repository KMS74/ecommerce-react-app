import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from './../../redux/actions/brandAction';
import { getAllSubCatInCate } from '../../redux/actions/subcategoryAction';
import notify from './../../hook/useNotifaction';
import { createProduct } from './../../redux/actions/productsAction';
import { useEffect, useState } from 'react';

const AdminAddProductsHook = () => {
  // product states
  const [images, setImages] = useState({});
  const [prodName, setProdName] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم');
  const [priceAftr, setPriceAftr] = useState('السعر بعد الخصم');
  const [qty, setQty] = useState('الكمية المتاحة');
  const [catId, setCatId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [seletedSubId, setSeletedSubId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prodColors, setProdColors] = useState([]);
  const [showColor, setShowColor] = useState(false);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  // getting all products from redux store
  const product = useSelector((state) => state.allproducts.products);
  // getting all categories from redux store
  const category = useSelector((state) => state.allCategory.category);
  // getting all brands from redux store
  const brand = useSelector((state) => state.allBrand.brand);
  // getting all sub categories from redux store
  const subcat = useSelector((state) => state.subCategory.subcategory);

  // multi image crop config object
  const crop = {
    unit: '%',
    width: '100',
    aspect: 1 / 1,
  };

  // to change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  // to change name state
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  // to change name state
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  // to change name state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAftr(event.target.value);
  }; // to change name state
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  // method of Multiselect component
  const onSelect = (selectedList) => setSeletedSubId(selectedList);
  const onRemove = (selectedList) => setSeletedSubId(selectedList);

  // when select a category upadte its state
  const onSelectCategory = async (e) => {
    if (e.target.value !== 0) {
      await dispatch(getAllSubCatInCate(e.target.value));
    }
    setCatId(e.target.value);
  };

  useEffect(() => {
    if (catId !== '0') {
      if (subcat) {
        setOptions(subcat.data);
      }
    }
  }, [catId, subcat]);

  useEffect(() => {
    if (loading === false) {
      // clear input data
      setProdColors([]);
      setImages([]);
      setProdName('');
      setProdDescription('');
      setPriceBefore('السعر قبل الخصم');
      setPriceAftr('السعر بعد الخصم');
      setQty('الكمية المتاحة');
      setBrandId('0');
      setSeletedSubId([]);
      setTimeout(() => setLoading(true), 1500);

      if (product) {
        if (product.status === 201 || product.status === 200) {
          notify('تم الاضافة بنجاح', 'success');
        } else {
          notify('هناك مشكله', 'error');
        }
      }
    }
  }, [loading, product]);

  // when select a brand upadte its state
  const onSelectBrand = (e) => setBrandId(e.target.value);
  // when selecting colors for a product
  const handelChangeComplete = (color) => {
    setProdColors([...prodColors, color.hex]);
    setShowColor(!showColor);
  };

  // removing a product color
  const removeProductColor = (color) => {
    const remainColors = prodColors.filter((e) => e !== color);
    setProdColors(remainColors);
  };

  // to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      catId === 0 ||
      prodName === '' ||
      prodDescription === '' ||
      images.length <= 0 ||
      priceBefore <= 0
    ) {
      notify('من فضلك قم بادخال جميع البيانات', 'warn');
      return;
    }

    // convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + '.png');
    // convert array of base 64 image to file
    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => dataURLtoFile(images[index], Math.random() + '.png')
    );

    const formData = new FormData();
    formData.append('title', prodName);
    formData.append('description', prodDescription);
    formData.append('quantity', qty);
    formData.append('price', priceBefore);
    formData.append('imageCover', imgCover);
    formData.append('category', catId);
    formData.append('brand', brandId);
    prodColors.map((color) => formData.append('availableColors', color));
    seletedSubId.map((item) => formData.append('subcategory', item._id));
    itemImages.map((item) => formData.append('images', item));

    setLoading(true);
    await dispatch(createProduct(formData));
    setLoading(false);
  };

  return [
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeProductColor,
    onSelectCategory,
    handelSubmit,
    onSelectBrand,
    prodColors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    crop,
  ];
};

export default AdminAddProductsHook;
