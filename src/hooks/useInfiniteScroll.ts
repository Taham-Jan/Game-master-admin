import { useCallback, useRef } from "react";

const useInfiniteScroll = (
  loadMore: () => void,
  hasMore: boolean,
  loading: boolean,
  totalItems?: number,
  currentItems?: number
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (
        loading ||
        !hasMore ||
        (totalItems && currentItems && currentItems >= totalItems)
      )
        return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore, totalItems, currentItems]
  );

  return lastElementRef;
};

export default useInfiniteScroll;
