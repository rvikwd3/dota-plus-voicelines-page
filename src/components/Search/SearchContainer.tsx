import { animated, config, useTransition } from "@react-spring/web";
import React, { SyntheticEvent, useContext, useMemo, useState } from "react";
import { IsSmallDisplayContext } from "../../context/IsSmallDisplayContextProvider";
import { HeroFilterContainer } from "./HeroFilterContainer";
import { MobileHeroFilterDisplay } from "./MobileHeroFilterDisplay";
import { SearchBar } from "./SearchBar";
import { parseHeroFilterItems } from "../../utils/parseHeroFilterItems";
import { HeroFilterItem } from "../../../types";

type Props = {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  heroFilter: string;
  setHeroFilter: React.Dispatch<React.SetStateAction<string>>;
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
  const [showHeroFilterContainer, setShowHeroFilterContainer] =
    useState<boolean>(false);

  const heroFilterHeroesToShow = useMemo(
    () =>
      parseHeroFilterItems().filter((item) =>
        item.name.some((name) => name.includes(searchInputValue.toLowerCase()))
      ),
    [searchInputValue]
  );

  const isSmallDisplay = useContext(IsSmallDisplayContext);

  const heroFilterContainerTransition = useTransition(showHeroFilterContainer, {
    from: { maxHeight: "0%" },
    enter: { maxHeight: "80%" },
    leave: { maxHeight: "0%" },
    config: config.default,
  });

  const openHeroFilterContainer = (event?: SyntheticEvent) => {
    setShowHeroFilterContainer(true);
  };

  const closeHeroFilterContainer = (event?: SyntheticEvent) => {
    setShowHeroFilterContainer(false);
  };

  const selectHeroFilterItem = (event: SyntheticEvent) => {
    const heroFilterName = event.currentTarget.getAttribute("data-heroname");
    if (
      heroFilterName === "" ||
      (heroFilterName && heroFilterName.length > 0)
    ) {
      setHeroFilter(heroFilterName);
      setSearchInputValue("");
      closeHeroFilterContainer();
    }
  };

  const handleSearchInputKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (heroFilterHeroesToShow.length === 1) {
        const heroFilterName =
          heroFilterHeroesToShow[0].name[
            heroFilterHeroesToShow[0].name.length - 1
          ];
        if (heroFilterName) {
          setHeroFilter(heroFilterName);
          setSearchInputValue("");
          closeHeroFilterContainer();
        }
      }
    }
  };

  const clearHeroFilter = () => {
    setHeroFilter("");
  };

  return (
    <>
      <div
        className={`bg-[#121212] w-full h-max text-center px-2 md:px-0 top-0 left-0 shadow-black/95 transition duration-200 flex justify-center overflow-visible ${className}`}
      >
        <SearchBar
          className="z-10"
          searchInputValue={searchInputValue}
          heroFilter={heroFilter}
          clearHeroFilter={clearHeroFilter}
          setSearchInputValue={setSearchInputValue}
          onSearchInputFocus={openHeroFilterContainer}
          onSearchInputBlur={closeHeroFilterContainer}
          onSearchInputKeyUp={handleSearchInputKeyUp}
        />
        {heroFilterContainerTransition(
          (styles, show) =>
            show && (
              <animated.div
                style={styles}
                className="z-20 absolute mt-12 md:mt-14 px-2 md:px-0 w-full h-full max-h-[80%] md:w-5/6 max-w-6xl overflow-hidden"
              >
                <HeroFilterContainer
                  searchInputValue={searchInputValue}
                  closeContainer={closeHeroFilterContainer}
                  onHeroFilterItemClick={selectHeroFilterItem}
                  heroesToShow={heroFilterHeroesToShow}
                  className="max-h-[80%] relative no-list-scrollbar"
                />
              </animated.div>
            )
        )}
      </div>

      {heroFilter.length > 0 && isSmallDisplay && (
        <MobileHeroFilterDisplay
          heroName={heroFilter}
          clearHeroFilter={clearHeroFilter}
        />
      )}
    </>
  );
};
