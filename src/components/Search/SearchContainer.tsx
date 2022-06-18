import React, { SyntheticEvent, useEffect, useState } from "react";
import { HeroFilterContainer } from "./HeroFilterContainer";
import { SearchBar } from "./SearchBar";

type Props = {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  heroFilter: string | null;
  setHeroFilter: React.Dispatch<React.SetStateAction<string | null>>;
  id?: string;
  className?: string;
};

export const SearchContainer = ({
  searchInputValue,
  setSearchInputValue,
  heroFilter,
  setHeroFilter,
  id,
  className,
}: Props) => {

  const [showHeroFilterContainer, setShowHeroFilterContainer] = useState<boolean>(true);

  const openHeroFilterContainer = (event?: SyntheticEvent) => {
    setShowHeroFilterContainer(true);
  };

  const closeHeroFilterContainer = (event?: SyntheticEvent) => {
    setShowHeroFilterContainer(false);
  };

  const selectHeroFilterItem = (event: SyntheticEvent) => {
    const heroFilterName = event.currentTarget.getAttribute("data-heroname");
    setHeroFilter(heroFilterName);
  };

  return (
    <div
      className={`bg-[#121212] w-full h-max text-center px-2 md:px-0 my-4 top-0 left-0 shadow-black/95 transition duration-200 flex justify-center overflow-visible`}
    >
      <SearchBar
        className="z-10"
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        onSearchInputFocus={openHeroFilterContainer}
        onSearchInputBlur={closeHeroFilterContainer}
      />
      {showHeroFilterContainer && (
        <div className="z-20 absolute mt-12 md:mt-14 px-2 md:px-0 w-full h-full max-h-[80%] md:w-5/6 max-w-6xl">
          <HeroFilterContainer
            searchInputValue={searchInputValue}
            closeContainer={closeHeroFilterContainer}
            onHeroFilterItemClick={selectHeroFilterItem}
            className="h-full relative"
          />
        </div>
      )}
    </div>
  );
};
