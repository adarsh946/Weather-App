import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValues: T) {
  const [localStore, setLocalStore] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValues;
    } catch (error) {
      console.error(error);
      return initialValues;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(localStore));
    } catch (error) {
      console.error(error);
    }
  }, [localStore, key]);

  return [localStore, setLocalStore];
}

export default useLocalStorage;
