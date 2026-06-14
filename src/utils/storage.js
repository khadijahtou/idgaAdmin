export const getStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (err) {
    return fallback;
  }
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
