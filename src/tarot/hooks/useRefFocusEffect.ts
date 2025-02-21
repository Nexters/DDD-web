import { useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
export default function useRefFocusEffect<T extends HTMLElement>(onFocusCallback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && onFocusCallback()),
        {
          threshold: 1,
        }
      );
      observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }
  });
  return { ref };
}
