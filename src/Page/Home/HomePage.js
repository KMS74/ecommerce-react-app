import React from 'react';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Silder from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import ViewHomeProductsHook from '../../hook/products/view-home-products-hook';
const HomePage = () => {
  // the first five products items
  const [items] = ViewHomeProductsHook();

  return (
    <div className="font" style={{ minHeight: '670px' }}>
      <Silder />
      <HomeCategory />
      <CardProductsContainer
        title="الاكثر مبيعا"
        btntitle="المزيد"
        pathText="/products"
        products={items}
      />
      <DiscountSection />
      <CardProductsContainer
        title="احدث الازياء"
        btntitle="المزيد"
        pathText="/products"
        products={items}
      />
      <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />
    </div>
  );
};

export default HomePage;
