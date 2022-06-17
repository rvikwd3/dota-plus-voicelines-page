import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

type Props = {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  id?: string;
  className?: string;
};

export const SearchBarContainer = ({ searchInputValue, setSearchInputValue, id, className }: Props) => {
  const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(
    !window.matchMedia("(min-width: 768px").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px")
      .addEventListener("change", (e) => setIsSmallDisplay(!e.matches));
  }, []);

  return (
    <div
      className={`bg-[#121212] w-full h-max text-center px-2 my-4 top-0 left-0 shadow-black/95 transition duration-200 flex justify-center`}
    >
      <SearchBar
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
    </div>
  );
};
