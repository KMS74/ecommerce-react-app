/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from '../../redux/actions/brandAction';
import ViewSearchProductsHook from './../products/view-search-products-hook';

const SidebarSearchHook = () => {
  const [catChecked, setCatChecked] = useState([]);
  const [brandChecked, setBrandChecked] = useState([]);
  const [From, setPriceFrom] = useState(0);
  const [To, setToFrom] = useState(0);

  const [, , , getProducts] = ViewSearchProductsHook();

  const dispatch = useDispatch();

  // When the component mounted to the DOM
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    get();
  }, [dispatch]);

  //   all categories
  const allCat = useSelector((state) => state.allCategory.category);
  // all brands
  const allBrand = useSelector((state) => state.allBrand.brand);

  let queryCat = '';
  let queryBrand = '';
  let category = [];

  try {
    // to get category
    if (allCat.data) {
      category = allCat.data;
    }
  } catch (e) {
    console.log(e);
  }

  // to get brand
  let brand = [];
  try {
    if (allBrand.data) {
      brand = allBrand.data;
    }
  } catch (e) {
    console.log(e);
  }

  //   when user check categories
  const clickCategory = (e) => {
    const value = e.target.value;
    if (value === '0') {
      setCatChecked([]);
    } else {
      if (e.target.checked === true) {
        setCatChecked([...catChecked, value]);
      } else if (e.target.checked === false) {
        const newArry = catChecked.filter((e) => e !== value);
        setCatChecked(newArry);
      }
    }
  };

  useEffect(() => {
    queryCat = catChecked.map((val) => 'category[in][]=' + val).join('&');
    localStorage.setItem('catCecked', queryCat);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [catChecked]);

  const clickBrand = (e) => {
    const value = e.target.value;
    if (value === '0') {
      setBrandChecked([]);
    } else {
      if (e.target.checked === true) {
        setBrandChecked([...brandChecked, value]);
      } else if (e.target.checked === false) {
        const newArry = brandChecked.filter((e) => e !== value);
        setBrandChecked(newArry);
      }
    }
  };

  useEffect(() => {
    queryBrand = brandChecked.map((val) => 'brand[in][]=' + val).join('&');
    localStorage.setItem('brandCecked', queryBrand);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [brandChecked]);

  const priceFrom = (e) => {
    localStorage.setItem('priceFrom', e.target.value);

    setPriceFrom(e.target.value);
  };
  const priceTo = (e) => {
    localStorage.setItem('priceTo', e.target.value);
    setToFrom(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [From, To]);

  return [category, brand, clickCategory, clickBrand, priceFrom, priceTo];
};

export default SidebarSearchHook;
