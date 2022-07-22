import baseURL from '../API/baseURL';

const useDeleteData = async (url, parmas) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  const res = await baseURL.delete(url, config, parmas);
  return res.data;
};

export default useDeleteData;
