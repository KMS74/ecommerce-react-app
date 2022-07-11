import React from 'react';
import BrandContainer from '../../Components/Brand/BrandContainer';
import Pagination from '../../Components/Uitily/Pagination';
import AllBrandHook from '../../hook/brand/all-brand-page-hook';

const AllBrand = () => {
  const [brand, loading, pageCount, getPage] = AllBrandHook();

  return (
    <div style={{ minHeight: '670px' }}>
      <BrandContainer data={brand.data} loading={loading} />
      {pageCount > 1 ? (
        <Pagination pageCount={pageCount} onPress={getPage} />
      ) : null}
    </div>
  );
};

export default AllBrand;
