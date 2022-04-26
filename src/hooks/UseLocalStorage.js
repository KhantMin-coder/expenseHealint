import { useState, useEffect } from "react";

export const useLocalStorage = (key, initalVal) => {
  // make pece of state,base of inital Value in localstorage
  const [val, setVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initalVal;
    } catch (e) {
      return initalVal;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);

  return [val, setVal];
};
