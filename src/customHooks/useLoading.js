import { useState } from "react";

const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  return { isLoading, setIsLoading };
};

export default useLoading;
