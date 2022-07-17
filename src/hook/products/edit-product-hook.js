import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from './../../redux/actions/brandAction';
import { getAllSubCatInCate } from '../../redux/actions/subcategoryAction';
import notify from './../../hook/useNotifaction';
import {
  getOneProduct,
  updateProducts,
} from './../../redux/actions/productsAction';
import { useEffect, useState } from 'react';
const AdminEditProductsHook = (proId) => {
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

  //   get one product data details
  const item = useSelector((state) => state.allproducts.oneProduct);
  // getting all products from redux store
  const product = useSelector((state) => state.allproducts.updateProducts);
  // getting all categories from redux store
  const category = useSelector((state) => state.allCategory.category);
  // getting all brands from redux store
  const brand = useSelector((state) => state.allBrand.brand);
  // getting all sub categories from redux store
  const subcat = useSelector((state) => state.subCategory.subcategory);

  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProduct(proId));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    run();
  }, [dispatch, proId]);

  useEffect(() => {
    try {
      if (item.data) {
        setImages(item.data.images);
        setProdName(item.data.title);
        setProdDescription(item.data.description);
        setPriceBefore(item.data.price);
        setPriceAftr(item.data.price);
        setQty(item.data.quantity);
        setCatId(item.data.category);
        setBrandId(item.data.brand);
        setProdColors(item.data.availableColors);
      }
    } catch (e) {}
  }, [item]);

  // multi image crop config object
  const crop = {
    unit: '%',
    aspect: 1 / 1,
    width: '100',
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
    setCatId(e.target.value);
  };

  useEffect(() => {
    if (catId !== 0) {
      const run = async () => {
        await dispatch(getAllSubCatInCate(catId));
      };
      run();
    }
  }, [catId, dispatch]);

  useEffect(() => {
    if (subcat) {
      setOptions(subcat.data);
    }
  }, [subcat]);

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
          notify('تم التعديل بنجاح', 'success');
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
  // eslint-disable-next-line no-unused-vars
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

  // convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.blob();
    const ext = url.split('.').pop();
    // eslint-disable-next-line no-unused-vars
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

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

    let imgCover;
    if (images[0].length <= 1000) {
      convertURLtoFile(images[0]).then((val) => (imgCover = val));
    } else {
      imgCover = dataURLtoFile(images[0], Math.random() + '.png');
    }

    const itemImages = [];
    // convert array of base 64 image to file
    // eslint-disable-next-line array-callback-return
    Array.from(Array(Object.keys(images).length).keys()).map((item, index) => {
      if (images[index].length <= 1000) {
        convertURLtoFile(images[index]).then((val) => itemImages.push(val));
      } else {
        itemImages.push(dataURLtoFile(images[index], Math.random() + '.png'));
      }
    });

    const formData = new FormData();
    formData.append('title', prodName);
    formData.append('description', prodDescription);
    formData.append('quantity', qty);
    formData.append('price', priceBefore);
    formData.append('category', catId);
    formData.append('brand', brandId);
    prodColors.map((color) => formData.append('availableColors', color));
    seletedSubId.map((item) => formData.append('subcategory', item._id));

    setTimeout(() => {
      formData.append('imageCover', imgCover);
      itemImages.map((item) => formData.append('images', item));
    }, 1000);

    setTimeout(async () => {
      setLoading(true);
      await dispatch(updateProducts(proId, formData));
      setLoading(false);
    }, 1000);
  };

  return [
    catId,
    brandId,
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

export default AdminEditProductsHook;
