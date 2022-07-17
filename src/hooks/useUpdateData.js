import baseURL from './../API/baseURL';

const useInUpdateDataWithImage = async (url, parmas) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await baseURL.put(url, parmas, config);
  console.log(res.status);
  return res;
};

const useInsUpdateData = async (url, parmas) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  const res = await baseURL.put(url, parmas, config);
  return res;
};

export { useInUpdateDataWithImage, useInsUpdateData };
