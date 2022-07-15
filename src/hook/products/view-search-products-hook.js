import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsSearch } from '../../redux/actions/productsAction';

const ViewSearchProductsHook = () => {
  const dispatch = useDispatch();
  // 8 products are showed per page
  // TODO : change it later to display more products in page
  const limit = 8;

  let word = '';
  let queryCat = '';
  let queryBrand = '';
  let priceFrom = '';
  let priceTo = '';
  let pricefromString = '';
  let priceToString = '';

  // get search query form local storage
  const getStorage = () => {
    if (localStorage.getItem('searchWord') !== null) {
      word = localStorage.getItem('searchWord');
    }
    if (localStorage.getItem('catCecked') !== null) {
      queryCat = localStorage.getItem('catCecked');
    }
    if (localStorage.getItem('brandCecked') !== null) {
      queryBrand = localStorage.getItem('brandCecked');
    }
    if (localStorage.getItem('priceTo') != null) {
      priceTo = localStorage.getItem('priceTo');
    }
    if (localStorage.getItem('priceFrom') != null) {
      priceFrom = localStorage.getItem('priceFrom');
    }
    if (priceFrom === '' || priceFrom <= 0) {
      pricefromString = '';
    } else {
      pricefromString = `&price[gte]=${priceFrom}`;
    }

    if (priceTo === '' || priceTo <= 0) {
      priceToString = '';
    } else {
      priceToString = `&price[lte]=${priceTo}`;
    }
  };

  const getProducts = async () => {
    getStorage();

    sortData();

    await dispatch(
      getAllProductsSearch(
        `limit=${limit}&keyword=${word}&sort=${sort}&${queryCat}&${queryBrand}${pricefromString}${priceToString}`
      )
    );
  };
  useEffect(() => {
    getProducts();
  }, []);

  const onPress = async (page) => {
    getStorage();
    sortData();
    await dispatch(
      getAllProductsSearch(
        `limit=${limit}&page=${page}&keyword=${word}&sort=${sort}&${queryCat}&${queryBrand}${pricefromString}${priceToString}`
      )
    );
  };

  const allProducts = useSelector((state) => state.allproducts.allProducts);

  let items = [];
  let pagination = [];
  let results = 0;

  try {
    if (allProducts.data) {
      // getting all products
      items = allProducts.data;
    } else {
      items = [];
    }
  } catch (e) {
    console.log(e);
  }
  try {
    if (allProducts.paginationResult) {
      pagination = allProducts.paginationResult.numberOfPages;
    } else {
      pagination = [];
    }
  } catch (e) {
    console.log(e);
  }
  try {
    if (allProducts.results) {
      results = allProducts.results;
    } else {
      results = [];
    }
  } catch (e) {
    console.log(e);
  }
  let sortType = '';
  let sort;
  /// when user choose sort type
  const sortData = () => {
    if (localStorage.getItem('sortType') !== null) {
      sortType = localStorage.getItem('sortType');
    } else {
      sortType = '';
    }

    if (sortType === 'السعر من الاقل للاعلي') sort = '+price';
    else if (sortType === 'السعر من الاعلي للاقل') sort = '-price';
    else if (sortType === '') sort = '';
    else if (sortType === 'الاكثر مبيعا') sort = '-sold';
    else if (sortType === 'الاعلي تقييما') sort = '-quantity';
  };

  return [items, pagination, onPress, getProducts, results];
};

export default ViewSearchProductsHook;
