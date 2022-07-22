import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneProduct,
  getProductLike,
} from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png';
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';
const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct(prodID));
  }, [dispatch, prodID]);

  const oneProducts = useSelector((state) => state.allproducts.oneProduct);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const productLike = useSelector((state) => state.allproducts.productLike);

  // to show products item
  let item = [];
  try {
    if (oneProducts.data) {
      item = oneProducts.data;
    } else {
      item = [];
    }
  } catch (e) {
    console.log(e);
  }
  useEffect(() => {
    if (item.category) {
      dispatch(getOneCategory(item.category));
    }
    if (item.brand) {
      dispatch(getOneBrand(item.brand));
    }
    if (item.category) {
      dispatch(getProductLike(item.category));
    }
  }, [item]);

  // to view images gallery
  let images = [];
  try {
    if (item.images) {
      images = item.images.map((img) => {
        return { original: img };
      });
    } else {
      images = [{ original: `${mobile}` }];
    }
  } catch (e) {
    console.log(e);
  }

  // to show category item
  let cat = [];
  try {
    if (oneCategory.data) {
      cat = oneCategory.data;
    } else {
      cat = [];
    }
  } catch (e) {
    console.log(e);
  }
  // to show brand item
  let brand = [];
  try {
    if (oneBrand.data) {
      brand = oneBrand.data;
    } else {
      brand = [];
    }
  } catch (e) {
    console.log(e);
  }

  let similarProducts = [];
  try {
    if (productLike) {
      similarProducts = productLike.data;
    } else {
      similarProducts = [];
    }
  } catch (e) {
    console.log(e);
  }

  return [item, images, cat, brand, productLike, similarProducts];
};

export default ViewProductsDetalisHook;
