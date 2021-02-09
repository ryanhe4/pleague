import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: any) => void;
type ReturnType<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];
const useInput = <T = any>(initialVaule: T): ReturnType<T> => {
  const [value, setValue] = useState(initialVaule);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
