import { useCallback, useEffect, useState } from "react";

type UseIntervalFetchingReturnType = {
  enableInterval: () => void;
  disableInterval: () => void;
};

export const useIntervalFetching = (
  dispatch: () => Promise<void>,
  intialFetch: boolean,
  refetchInterval: number | undefined
): UseIntervalFetchingReturnType => {
  const [isIntervalDisabled, setIsIntervalDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!intialFetch || !refetchInterval || isIntervalDisabled) return;
    const timeoutId = setInterval(() => {
      dispatch();
    }, refetchInterval);

    return () => clearInterval(timeoutId);
  }, [dispatch, intialFetch, refetchInterval, isIntervalDisabled]);

  const enableInterval = useCallback(() => {
    if (!isIntervalDisabled) return;
    setIsIntervalDisabled(false);
  }, [isIntervalDisabled]);

  const disableInterval = useCallback(() => {
    if (isIntervalDisabled) return;
    setIsIntervalDisabled(true);
  }, [isIntervalDisabled]);

  return { enableInterval, disableInterval };
};
