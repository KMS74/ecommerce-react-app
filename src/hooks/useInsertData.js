import baseURL from '../API/baseURL';

const useInsertData = async (url, params) => {
  const res = await baseURL.post(url, params);
  return res;
};

const useInsertDataWithImage = async (url, params) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  const res = await baseURL.post(url, params, config);
  console.log(res.status);
  return res;
};

export { useInsertData, useInsertDataWithImage };
