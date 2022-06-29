import { useState, useCallback } from "react";

const useInput = (initialdata = null) => {
  const [value, setValue] = useState(initialdata);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};

export default useInput;
