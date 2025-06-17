import axios from "axios";

let callCount = 0;

/**
 * Memanggil API dan mensimulasikan error hingga `failUntilCount` tercapai.
 */
export const fetchPosts = async (failUntilCount = 0) => {
  callCount++;

  // Jika masih dalam jumlah percobaan gagal
  const shouldFail = failUntilCount > 0 && callCount <= failUntilCount;

  // eslint-disable-next-line no-useless-catch
  try {
    const url = shouldFail
      ? `https://jsonplaceholder.typicode.com/posts/invalid-${callCount}` // simulasikan error
      : `https://jsonplaceholder.typicode.com/posts`; // sukses
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset jumlah pemanggilan API (digunakan sebelum retry ulang)
 */
export const resetCallCount = () => {
  callCount = 0;
};
