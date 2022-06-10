import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (
  initialLimit: number,
  limitIncrement: number,
) => {
  const [limit, setLimit] = useState(initialLimit);
  const loadMoreTriggerRef = useRef(null);
  let prevRatio = 0.0;  // Tracking previous intersection ratio to check if intersection direction is positive

  const handleObserver = useCallback((intersectionObserverEntries: IntersectionObserverEntry[]) => {
    const [target] = intersectionObserverEntries;

    // If Intersecting
    // AND
    // If intersection direction is positive (scrolling down)
    if (target.isIntersecting && target.intersectionRatio > prevRatio) {
        setLimit((prevLimit) => Math.max(prevLimit + limitIncrement));
    }
    prevRatio = target.intersectionRatio;
  }, []);

  useEffect( () => {
    const intersectionObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const intersectionObserver = new IntersectionObserver(handleObserver, intersectionObserverOptions);

    if (loadMoreTriggerRef.current) {
      intersectionObserver.observe(loadMoreTriggerRef.current);
    } 
  }, [handleObserver]);

  return { loadMoreTriggerRef, limit };
};

export default useInfiniteScroll;