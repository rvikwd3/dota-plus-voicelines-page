import { SyntheticEvent, useContext, useRef } from "react";
import { IsSmallDisplayContext } from "../../context/IsSmallDisplayContextProvider";
import { CancelIcon, SearchIcon } from "../../icons";
import { SearchBarHeroFilterDisplay } from "./SearchBarHeroFilterDisplay";

type Props = {
  searchInputValue: string;
  heroFilter: string;
  clearHeroFilter: () => void;
  setSearchInputValue: (value: string) => void;
  onSearchInputFocus: (event: SyntheticEvent) => void;
  onSearchInputBlur: (event: SyntheticEvent) => void;
  onSearchInputKeyUp: (event: React.KeyboardEvent) => void;
  id?: string;
  className?: string;
};

export const SearchBar = ({
  searchInputValue,
  heroFilter,
  clearHeroFilter,
  setSearchInputValue,
  onSearchInputFocus,
  onSearchInputBlur,
  onSearchInputKeyUp,
  id,
  className,
}: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isSmallDisplay = useContext(IsSmallDisplayContext);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInputValue(event.target.value);
  };

  const clearSearchInput = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();  // prevent heroFilterContainer from openening
    setSearchInputValue("");
  };

  const focusOnSearchInput = () => {
    if (searchInputRef) {
      searchInputRef.current?.focus();
    }
  };

  return (
    <div className={`${className} relative w-full md:w-5/6 max-w-6xl`} id={id}>
      <span className="sr-only">Search</span>
      <div
        className="z-0 flex flex-row items-center w-full h-12 md:h-14 pr-2 py-2 rounded-md bg-zinc-800 border-4 border-neutral-700 hover:border-neutral-600 focus-within:hover:border-neutral-400 focus-within:border-neutral-400 transition duration-200 ease-in cursor-text"
        onClick={focusOnSearchInput}
      >
        <span className="pl-3 pr-2 pointer-events-none flex items-center">
          <SearchIcon className="z-10 stroke-neutral-300 shadow-sm" />
        </span>
        {!isSmallDisplay && (
          <SearchBarHeroFilterDisplay
            heroName={heroFilter}
            clearHeroFilter={clearHeroFilter}
          />
        )}
        <input
          ref={searchInputRef}
          className="grow pl-2 bg-inherit text-neutral-100 placeholder:text-stone-300 text-lg md:text-2xl tracking-tight [text-shadow:0_4px_8px_rgba(0,0,0,0.12)] outline-none"
          placeholder="Search for heroes and quotes..."
          type="text"
          name="search"
          value={searchInputValue}
          onChange={onSearchInputChange}
          onFocus={onSearchInputFocus}
          onBlur={onSearchInputBlur}
          onKeyUp={onSearchInputKeyUp}
        />
        {searchInputValue.length > 0 && (
          <span
            onClick={clearSearchInput}
            className="self-end cursor-pointer active:scale-75 hover:scale-95 transition duration-100 ease-in"
          >
            <CancelIcon className="z-10 w-8 h-8 shadow-sm stroke-neutral-500 hover:stroke-neutral-200 transition duration-100 ease-out" />
          </span>
        )}
      </div>
    </div>
  );
};
