import { useEffect, useState } from "react";

type Props = {
  id?: string;
  className?: string;
};

export const SearchBarContainer = ({ id, className }: Props) => {
  const [isPastScrollOffset, setIsPastScrollOffset] = useState<boolean>(false);
  const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(
    !window.matchMedia("(min-width: 768px").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px")
      .addEventListener("change", (e) => setIsSmallDisplay(!e.matches));
  }, []);

  useEffect(() => {
    const scrollOffset = isSmallDisplay ? 56 : 104;
    window.onscroll = () => {
      if (window.scrollY > scrollOffset) {
        setIsPastScrollOffset(true);
      } else {
        setIsPastScrollOffset(false);
      }
    };
  }, []);

  return (
    <div
      className={`bg-[#121212] w-full h-full p-4 my-4 z-20 sticky top-0 left-0 shadow-black/95 transition duration-200 ${
        isPastScrollOffset ? "shadow-lg" : "shadow-none"
      }`}
    >
      <div className="bg-stone-700 p-5 rounded-md">
        <span>Search Bar</span>
      </div>
    </div>
  );
};
