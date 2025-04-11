import { useEffect, useReducer, useCallback, MutableRefObject } from "react";
import debounce from "lodash/debounce";

type LazyLoadState<T> = {
  loading: boolean;
  currentPage: number;
  data: T[];
  hasMore: boolean;
};

type LazyLoadAction<T> =
  | { type: "reset" }
  | { type: "set"; payload: Partial<LazyLoadState<T>> }
  | { type: "onGrabData"; payload: { data: T[] } };

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 0;

const reducer = <T>(state: LazyLoadState<T>, action: LazyLoadAction<T>) => {
  switch (action.type) {
    case "set":
      return { ...state, ...action.payload };
    case "onGrabData": {
      const newData = [...state.data, ...action.payload.data];
      const hasMore = action.payload.data.length > 0;
      return {
        ...state,
        loading: false,
        data: newData,
        currentPage: state.currentPage + 1,
        hasMore
      };
    }
    case "reset":
      return {
        loading: false,
        currentPage: 1,
        data: [],
        hasMore: true,
      };
    default:
      return state;
  }
};

type UseLazyLoadParams<T> = {
  triggerRef: MutableRefObject<HTMLElement | null>;
  onGrabData: (currentPage: number) => Promise<T[]>;
  options?: IntersectionObserverInit;
};

const useLazyLoad = <T>({
  triggerRef,
  onGrabData,
  options
}: UseLazyLoadParams<T>) => {
  const [state, dispatch] = useReducer(reducer<T>, {
    loading: false,
    currentPage: 1,
    data: [],
    hasMore: true
  });

  const _handleEntry = async (entry: IntersectionObserverEntry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      !state.loading &&
      state.hasMore && // Check if more data is available
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      try {
        dispatch({ type: "set", payload: { loading: true } });
        const data = await onGrabData(state.currentPage);

        // Stop loading if no data returned
        if (data.length === 0) {
          dispatch({ type: "set", payload: { hasMore: false, loading: false } });
          return;
        }

        dispatch({ type: "onGrabData", payload: { data } });
      } catch (error) {
        dispatch({ type: "set", payload: { loading: false } });
      }
    }
  };

  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  useEffect(() => {
    const container = triggerRef.current;
    if (!container || !state.hasMore) return;

    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(container);

    return () => observer.disconnect();
  }, [triggerRef, onIntersect, options, state.hasMore]);

  return { ...state, reset };
};

export default useLazyLoad;